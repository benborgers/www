---
title: Building an e-ink picture frame that displays an iCloud photo album
date: 2024-01-09
hackerNewsUrl: https://news.ycombinator.com/item?id=38928277
bestOf: true
---

For Christmas, I gave my parents this e-ink picture frame (built from an old e-reader) that cycles through photos from a shared iCloud photo album:

![](/posts/eink/frame.jpg)
![](/posts/eink/icloud.jpg)

It's a re-worked version of a gift that I gave to my girlfriend in October, except that one was in a smaller frame that fell apart pretty quickly:

![](/posts/eink/IMG_9398%20Large.jpeg)

I rebuilt hers to be more solid, and built one for my parents at the same time. Here's how I did it:

## The e-reader

For this project I went with a Nook Simple Touch Reader. You can find them on eBay or Facebook Marketplace for $10-$30 used.

![](/posts/eink/image.png)

The reason to go with a Nook instead of a Kindle or another e-reader is that Nooks run Android under the hood. That means they're far easier to root and to run Android apps on.

For that part, I followed [this wonderful post by Terence Eden](https://shkspr.mobi/blog/2020/02/turn-an-old-ereader-into-an-information-screen-nook-str/). The process was quite straightforward; the only thing to note is that you'll need a microSD card.

After you get it running Android, as the post describes, you can run an ancient Android app called Electric Sign. This app allows you to put any website on the Nook's screen and have it refresh at a given interval, with a catch: the Nook doesn't support SSL. Therefore I had to set up a website that uses `http://` instead of `https://`, which is remarkably difficult in this day and age. (I had to set up a custom Nginx server, because you can't use something like Vercel.)

But once that part was done, I just had to put the website URL into the Electric Sign app on the Nook and I was all set!

## The frame

I bought [this pack of 8x10 frames off Amazon](https://www.amazon.com/dp/B09ZQ9GQ95), but in general what I was looking for was a frame that was large but could hold a 5x7 picture with a matte. That's because the Nook's display was more or less 5x7, but I needed a big frame (8x10) to hold the sides and charging cable coming out the bottom.

I simply jammed the Nook into the frame and forced the latches on the back shut, with the cable sticking out the bottom. It surprisingly fits the Nook, albeit with some bulging in the back.

If you look closely, the black bezels at the top and bottom of the Nook would show through the 5x7 hole, so I added some white card stock to have them blend in a bit better.

## iCloud photo album

I wanted to source the images from a shared iCloud photo album. That way, I could share the album with my parents, and they could add new photos that would show up on the frame right from their Photos app.

iCloud photo albums have no API. However, if you share an iCloud photo album to a public link, you can use the Developer Tools to inspect the API requests Apple is making to get the photos. If you replicate those requests, you too can load the photos from the shared iCloud album (as long as the album stays publicly shared).

Here's my [Laravel](https://laravel.com) code that I used, for reference:

```php
$webstream = Http::post('https://p01-sharedstreams.icloud.com/12345678/sharedstreams/webstream', [
    'streamCtag' => null
]);

$photoGuids = collect($webstream->json()['photos'])->pluck('photoGuid');

// I wanted the highest quality versions, so those are the checksums I collected for later.
$checksums = collect($webstream->json()['photos'])->map(function ($photo) {
    $maxFileSize = 0;
    $maxFileSizeChecksum = null;

    foreach ($photo['derivatives'] as $derivative) {
        if ($derivative['fileSize'] > $maxFileSize) {
            $maxFileSize = $derivative['fileSize'];
            $maxFileSizeChecksum = $derivative['checksum'];
        }
    }

    return $maxFileSizeChecksum;
});

$assets = Http::post('https://p01-sharedstreams.icloud.com/12345678/sharedstreams/webasseturls', [
    'photoGuids' => $photoGuids,
]);

$urls = collect($assets->json()['items'])
    ->filter(function ($item, $key) use ($checksums) {
        return $checksums->contains($key);
    })
    ->map(function ($item) {
        return 'https://' . $item['url_location'] . $item['url_path'];
    })
    ->values();

$url = $urls->random(); // Pick a random photo from the album.
```

From this, I just inserted the image into a very simple HTML page, using the [wsrv.nl](https://wsrv.nl) API to crop the photo to the exact dimensions of the Nook (600x800 pixels):

```blade
<img src="{{ route('image', ['url' => "https://wsrv.nl/?url={$encodedUrl}&w=600&h=800&fit=cover&mod=1.2"], false) }}" />
```

I did brighten the images a little (using `mod=1.2`) so they'd look better on the e-ink screen, and also you'll notice that I'm going through an `image` route — that's a route that proxies Apple's images because those images would normally use `https` and I need them going through my `http`-only server so the Nook can load the image.

## Putting it all together

I mounted the Nook in the frame, set the website with the photo from the shared album, and closed it all up with a charging cable so it can stay plugged in all the time. It's been working beautifully so far!
