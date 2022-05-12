<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;

class CheckLinks implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $seenLinks = [];
    private $deadLinks = [];

    private $sites = [
        [
            'domain' => 'benborgers.com',
            'email' => null
        ],
        [
            'domain' => 'connellmccarthy.com',
            'email' => 'me@connellmccarthy.com'
        ]
    ];

    public function handle()
    {
        foreach ($this->sites as $site) {
            $this->checkPageLinks(
                url: '/',
                origin: '',
                site: $site
            );
        }
    }

    private function checkPageLinks($url, $origin, $site)
    {
        $url = $this->normalizeUrl($url, $site);

        if (
            in_array($url, $this->seenLinks)
            || ! str($url)->startsWith('https://' . $site['domain'])
            || str($url)->contains('cdn-cgi')
        ) {
            return;
        }

        // ray('checking ' . $url . ' via ' . $origin);

        $this->seenLinks[] = $url;

        try {
            $response = Http::get($url);

            if (! $response->ok()) {
                $this->reportDeadUrl($url, $origin);
                return;
            }
        } catch (\Exception $e) {
            $this->reportDeadUrl($url, $origin);
            logger()->error($e->getMessage());
            return;
        }

        $links = str($response->body())->matchAll('/href="(.*?)"/');
        $links->each(fn ($link) => $this->checkPageLinks($link, $url, $site));

        if (
            $url === $this->normalizeUrl('/', $site)
            && count($this->deadLinks) > 0
        ) {
            $seenLinksCount = count($this->seenLinks);
            $seenLinksWord = str()->plural('link', $seenLinksCount);
            $deadLinksCount = count($this->deadLinks);
            $deadLinksWord = str()->plural('link', $deadLinksCount);

            $domain = $site['domain'];

            $recipients = ['benborgers@hey.com']; // I get sent a copy every time.
            if ($site['email']) {
                $recipients[] = $site['email']; // Maybe there's another recipient, if not just me.
            }

            foreach ($recipients as $recipient) {
                Mail::raw(
                    "Hello there! We checked {$seenLinksCount} ${seenLinksWord} on {$domain} and found {$deadLinksCount} dead {$deadLinksWord}.\n\n"
                    . collect($this->deadLinks)->map(fn ($link) => '• ' . $link)->join("\n")
                    . "\n\n— Reach out to Ben Borgers (benborgers@hey.com) if you have questions about this email.",

                    function ($message) use ($deadLinksCount, $recipient, $deadLinksWord, $domain) {
                        $message->from(config('mail.from.address'), config('mail.from.name'));
                        $message->to($recipient);
                        $message->replyTo('benborgers@hey.com');
                        $message->subject("{$deadLinksCount} dead {$deadLinksWord} on found on {$domain}");
                    }
                );
            }

            $this->seenLinks = [];
            $this->deadLinks = [];
        }
    }

    private function normalizeUrl($url, $site)
    {
        if (str($url)->startsWith('/')) {
            return 'https://' . $site['domain'] . $url;
        }

        return $url;
    }

    private function reportDeadUrl($url, $origin)
    {
        $this->deadLinks[] = "$url, linked from $origin";
    }
}
