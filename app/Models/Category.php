<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;

class Category extends Model
{
    protected $fillable = [
    'name', 'slug',
    'name_en', 'name_fr', 'name_ar',
    'description_en', 'description_fr', 'description_ar',
];

    protected $appends = ['image_url'];

    public function getImageUrlAttribute(): ?string
    {
        if (!$this->image) return null;
        return Storage::disk('public')->url($this->image);
    }

    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }
}