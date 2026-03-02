<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\CartItem;
use App\Models\User;

class Cart extends Model
{
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function cartItem(): HasMany
    {
        return $this->hasMany(CartItem::class);
    }
}
