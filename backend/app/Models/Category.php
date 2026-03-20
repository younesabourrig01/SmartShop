<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;
use App\Models\Product;

class Category extends Model
{
    protected $fillable = [
        'name',
        'image',
        'description'
    ];

    protected $appends = ['url'];

    public function getUrlAttribute()
    {
        return $this->image ? Storage::disk('public')->url($this->image) : null;
    }

    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }
}
