<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

use Illuminate\Support\Facades\Storage;
use ImageOptimizer;

class OptimizeImages implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function handle()
    {
        Storage::makeDirectory('public/optimized');

        $files = Storage::allFiles('public');
        foreach ($files as $file) {
            if (! str($file)->startsWith('public/optimized')) {
                if (Storage::missing(str($file)->replace('public', 'public/optimized'))) {
                    ImageOptimizer::optimize(
                        storage_path("app/$file"),
                        storage_path(str("app/$file")->replace('public', 'public/optimized'))
                    );
                }
            }
        }
    }
}
