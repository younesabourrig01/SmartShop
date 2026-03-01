<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Cart;
class CartController extends Controller
{
    public function index(Request $request)
    {
        $cart = $request->user()
            ->cart()
            // Eager Loading
            ->with('cartItems.product')
            ->first();

        $total = 0;
        foreach ($cart->cartItems as $item) {
            $total += $item->product->price * $item->quantity;
        }
        return response()->json([
            'status' => 'success',
            'data' => $cart,
            'total' => $total
        ]);
    }
    public function add(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1'
        ]);
        $user = $request->user();
        $cart = $user->cart()->first();

        if (!$cart) {
            $cart = Cart::create([
                'user_id' => $user->id,
            ]);
        }

        $cartItem = $cart->cartItems()->where('product_id', $request->product_id)->first();

        if ($cartItem) {
            $cartItem->update([
                'quantity' => $cartItem->quantity + $request->quantity,
            ]);
        } else {
            $cart->cartItems()->create([
                'cart_id' => $cart->id,
                'product_id' => $request->product_id,
                'quantity' => $request->quantity,
            ]);
            return response()->json([
                'status' => 'success',
                'message' => 'Product added to cart'
            ]);
        }
    }
    public function update(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:0'
        ]);

        $user = $request->user();
        $cart = $user->cart()->first();

        if (!$cart) {
            return response()->json([
                'status' => 'error',
                'message' => 'cart not found'
            ], 404);
        }

        $cartItem = $cart->cartItems()->where('product_id', $request->product_id)->first();

        if (!$cartItem) {
            return response()->json([
                'status' => 'error',
                'message' => 'Product not found in the cart '
            ], 404);
        }

        if ($request->quantity == 0) {
            //remove single product logic from cart 
            $cartItem->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Product removed from cart'
            ]);
        }
        ;

        $cartItem->update([
            'quantity' => $request->quantity,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Cart updated successfully'
        ]);
    }
    public function clear(Request $request)
    {
        $user = $request->user();
        $cart = $user->cart()->first();

        if ($cart) {
            $cart->cartItems()->delete();
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Cart has been emptied'
        ]);
    }
}
