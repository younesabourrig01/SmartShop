<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use app\Models\Category;
use app\Models\OrderItem;

class Product extends Model
{
    public function orderItems():HasMany
    {
        return $this->hasMany(OrderItem::class);
    }
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
