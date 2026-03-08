<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\CartItem;
use App\Models\User;

class Cart extends Model
{
    protected $fillable = [
        "user_id",
    ];
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function cartItems(): HasMany
    {
        return $this->hasMany(CartItem::class);
    }
    // total to pay (used in order & cart)
    public function getTotal()
    {
        return $this->cartItems->sum(function ($item) {
            return $item->product->price * $item->quantity;
        });
    }
}
