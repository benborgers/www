<?php $attributes ??= new \Illuminate\View\ComponentAttributeBag; ?>
<?php foreach($attributes->onlyProps(['title']) as $__key => $__value) {
    $$__key = $$__key ?? $__value;
} ?>
<?php $attributes = $attributes->exceptProps(['title']); ?>
<?php foreach (array_filter((['title']), 'is_string', ARRAY_FILTER_USE_KEY) as $__key => $__value) {
    $$__key = $$__key ?? $__value;
} ?>
<?php $__defined_vars = get_defined_vars(); ?>
<?php foreach ($attributes as $__key => $__value) {
    if (array_key_exists($__key, $__defined_vars)) unset($$__key);
} ?>
<?php unset($__defined_vars); ?>

<!DOCTYPE html>
<html lang="<?php echo e(str_replace('_', '-', app()->getLocale())); ?>">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title><?php echo e($title); ?></title>
        <link rel="icon" href="https://emojicdn.elk.sh/<?php echo e(app()->isLocal() ? '🚧' : '🐙'); ?>">

        <?php echo app('Illuminate\Foundation\Vite')(['resources/css/app.css']); ?>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css">
    </head>
    <body class="antialiased text-gray-700">
        <?php echo e($slot); ?>

    </body>
</html>
<?php /**PATH /var/www/html/resources/views/components/layout.blade.php ENDPATH**/ ?>