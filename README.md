# benborgers.com

## Image Optimization

Images are optimized using [`spatie/laravel-image-optimizer`](https://github.com/spatie/laravel-image-optimizer). Images in `public/` are optimized and put into `public/optimized`, retaining the original image. The `markdown()` accessor in the `Post` model replaces images with their optimized versions.

To make this work, you have to [install the required optimizers](https://github.com/spatie/image-optimizer#optimization-tools) on the server.
