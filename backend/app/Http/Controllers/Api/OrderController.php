<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function checkout(Request $request)
    {
        $user = $request->user();
        $cart = $user->cart()->with('cartItems.product')->first();
        if (!$cart || $cart->cartItems->isEMpty()) {
            return response()->json([
                'status' => 'error',
                'message' => 'cart is empty'
            ]);
        }
        //totale
        $total = $cart->cartItems->sum(function ($item) {
            return $item->product->price * $item->quantity;
        });

        $order = $user->orders()->create([
            'user_id' => $request->user_id,
            'total' => $total,
        ]);

        //create order items using cartItems
        foreach ($cart->cartItems as $item) {

            $order->orderItems()->create([
                'product_id' => $item->product_id,
                'quantity' => $item->quantity,
                'price' => $item->product->price
            ]);

        }
        $cart->cartItems()->delete();
        return response()->json([
            'status' => 'success',
            'message' => 'Order created successfully',
            'order' => $order
        ]);
    }
}
