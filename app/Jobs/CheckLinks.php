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

    public function handle()
    {
        $this->checkPageLinks('/');
    }

    private function checkPageLinks($url, $origin = '')
    {
        $url = $this->normalizeUrl($url);

        if (
            in_array($url, $this->seenLinks)
            || ! str($url)->startsWith('https://benborgers.com')
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
        $links->each(fn ($link) => $this->checkPageLinks($link, $url));

        if ($url === 'https://benborgers.com/') {
            $seenLinksCount = count($this->seenLinks);
            $deadLinksCount = count($this->deadLinks);

            Mail::raw(
                'Good morning! We checked ' . $seenLinksCount . ' ' . str()->plural('link', $seenLinksCount)
                . ' on benborgers.com and found ' . $deadLinksCount . ' ' . str()->plural('dead link', $deadLinksCount) . '.' . "\n\n"
                . collect($this->deadLinks)->map(fn ($link) => '• ' . $link)->join("\n"),
                function ($message) use ($deadLinksCount) {
                    $message->from(config('mail.from.address'), config('mail.from.name'));
                    $message->to('benborgers@hey.com');
                    $message->subject(
                        $deadLinksCount > 0
                        ? $deadLinksCount . ' ' . str()->plural('dead link', $deadLinksCount) . ' found'
                        : 'No dead links found!'
                    );
                }
            );
        }
    }

    private function normalizeUrl($url)
    {
        if (str($url)->startsWith('/')) {
            return 'https://benborgers.com' . $url;
        }

        return $url;
    }

    private function reportDeadUrl($url, $origin)
    {
        $this->deadLinks[] = "$url via $origin";
    }
}
