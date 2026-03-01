<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use app\Models\Cart;

class CartItem extends Model
{
    public function cart():BelongsTo
    {
        return $this->belongsTo(Cart::class);
    }
}
