<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;
use App\Models\Category;
use App\Models\OrderItem;
use App\Models\ProductImage;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'description',
        'price',
        'stock',
        'category_id'
    ];

    //delete images drom Db wen delete Product
    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($product) {

            foreach ($product->images as $image) {

                Storage::disk('public')->delete($image->image);
            }
        });
    }
    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }
    public function images(): HasMany
    {
        return $this->hasMany(ProductImage::class);
    }
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
