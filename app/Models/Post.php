<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

use App\Jobs\OptimizeImages;

class Post extends Model
{
    use HasFactory;

    protected $casts = [
        'date' => 'datetime',
        'technical' => 'boolean'
    ];

    public static function boot()
    {
        parent::boot();

        self::saved(function () {
            dispatch(function () {
                cache()->forget('posts');
                all_posts(); // Fill cache again so everything’s fast.
            });

            OptimizeImages::dispatch();
        });
    }

    protected function markdown(): Attribute
    {
        return Attribute::make(
            get: fn () => str($this->body)
                ->replaceMatches('/\(\/storage/', '(/storage/optimized')
        );
    }

    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }
}
