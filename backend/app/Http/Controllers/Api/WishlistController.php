<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class WishlistController extends Controller
{
    public function index(Request $request)
    {
        $wishlist = $request->user()
            ->wishlist()
            ->with('wishlistItems.product')
            ->first();

        return response()->json($wishlist);
    }
    public function store(Request $request, $productId)
    {
        $user = $request->user();

        $wishlist = $user->wishlist()->firstOrCreate([]);

        if ($wishlist->wishlistItems()->where('product_id', $productId)->exists()) {
            return response()->json([
                'message' => 'Product already in wishlist'
            ], 400);
        }

        $wishlist->wishlistItems()->create([
            'product_id' => $productId
        ]);

        return response()->json([
            'message' => 'Product added to wishlist'
        ]);
    }
    public function destroy(Request $request, $productId)
    {
        $user = $request->user();

        $wishlist = $user->wishlist;

        $item = $wishlist->wishlistItems()
            ->where('product_id', $productId)
            ->first();

        if (!$item) {
            return response()->json([
                'message' => 'Product not found in wishlist'
            ], 404);
        }

        $item->delete();

        return response()->json([
            'message' => 'Product removed from wishlist'
        ]);
    }
    public function inWishlist(Request $request, $productId)
    {
        $user = $request->user();

        $wishlist = $user->wishlist;

        if (!$wishlist) {
            return response()->json([
                'in_wishlist' => false
            ]);
        }

        $exists = $wishlist->wishlistItems()
            ->where('product_id', $productId)
            ->exists();

        return response()->json([
            'in_wishlist' => $exists
        ]);
    }
}
