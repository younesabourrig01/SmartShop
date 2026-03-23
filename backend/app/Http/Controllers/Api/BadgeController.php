<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BadgeController extends Controller
{
    public function getUserBadge(Request $request)
    {
        $user = $request->user();
        $badge = $user->getBadge();
        $discount = $user->getShippingDiscount();

        return response()->json([
            'badge' => $badge,
            'orders_count' => $user->orders()->count(),
            'wishlist_count' => $user->wishlist ? $user->wishlist->wishlistItems()->count() : 0,
            'shipping_discount' => $discount,
        ]);

    }
}
