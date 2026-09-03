<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;

class Product extends Model
{
    protected $fillable = [
        'category_id', 'name', 'name_fr', 'name_ar',
        'slug', 'description', 'description_fr', 'description_ar',
        'images', 'model_number', 'price', 'is_featured', 'is_active'
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'is_active'   => 'boolean',
        'price'       => 'decimal:2',
        'images'      => 'array',
    ];

    protected $appends = ['image_urls'];

    public function getImageUrlsAttribute(): array
    {
        if (!$this->images) return [];
        return array_map(
            fn($img) => Storage::disk('public')->url($img),
            $this->images
        );
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function specs(): HasMany
    {
        return $this->hasMany(ProductSpec::class)->orderBy('sort_order');
    }
}