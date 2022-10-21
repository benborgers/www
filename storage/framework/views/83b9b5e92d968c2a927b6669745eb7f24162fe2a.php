<?php if (isset($component)) { $__componentOriginalc254754b9d5db91d5165876f9d051922ca0066f4 = $component; } ?>
<?php $component = Illuminate\View\AnonymousComponent::resolve(['view' => 'components.layout','data' => ['title' => 'Ben Borgers']] + (isset($attributes) ? (array) $attributes->getIterator() : [])); ?>
<?php $component->withName('layout'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $constructor = (new ReflectionClass(Illuminate\View\AnonymousComponent::class))->getConstructor()): ?>
<?php $attributes = $attributes->except(collect($constructor->getParameters())->map->getName()->all()); ?>
<?php endif; ?>
<?php $component->withAttributes(['title' => 'Ben Borgers']); ?>
    <div class="max-w-screen-sm mx-auto px-4 pt-8 pb-32">
        <header class="border-b border-gray-300 pb-2">
            <a href="<?php echo e(route('index')); ?>" class="block w-max font-charter text-lg text-gray-800 italic">
                Ben Borgers
            </a>
        </header>

        <main class="mt-24">
            <img src="<?php echo e(asset('img/me.jpg')); ?>" alt="" class="h-24 rounded-2xl" />
            <div class="mt-6 prose max-w-none">
                <p>
                    Hello! I’m a developer from Boston, MA. I’m currently majoring in computer science at Tufts University.
                </p>
                <p>
                    Lately, I’ve been:
                </p>
            </div>
        </main>
    </div>
 <?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__componentOriginalc254754b9d5db91d5165876f9d051922ca0066f4)): ?>
<?php $component = $__componentOriginalc254754b9d5db91d5165876f9d051922ca0066f4; ?>
<?php unset($__componentOriginalc254754b9d5db91d5165876f9d051922ca0066f4); ?>
<?php endif; ?>
<?php /**PATH /var/www/html/resources/views/index.blade.php ENDPATH**/ ?>