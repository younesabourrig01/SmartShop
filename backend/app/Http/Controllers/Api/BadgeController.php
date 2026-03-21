<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BadgeController extends Controller
{
    public function getUserBadge(Request $request)
    {
        $user = $request->user();
        $ordersCount = $user->orders()->count();

        if ($ordersCount <= 7) {
            $badge = 'normal';
        }
        elseif ($ordersCount <= 20) {
            $badge = 'medium';
        }
        else {
            $badge = 'premium';
        }

        return response()->json([
            'badge' => $badge,
            'orders_count' => $ordersCount,
            'wishlist_count' => $user->wishlist ? $user->wishlist->wishlistItems()->count() : 0,
        ]);

    }
}
