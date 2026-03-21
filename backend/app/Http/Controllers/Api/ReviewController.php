<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function productReviews($productId)
    {
        $reviews = Review::where('product_id', $productId)
            ->with('user')
            ->latest()
            ->get();

        return response()->json($reviews);
    }
    public function store(Request $request, $productId)
    {
        $user = $request->user();

        $request->validate([
            'review' => 'required|string|max:255',
            'rating' => 'nullable|integer|min:1|max:5',
        ]);

        if ($user->reviews()->where('product_id', $productId)->exists()) {
            return response()->json([
                'message' => 'You already reviewed this product'
            ], 400);
        }

        $user->reviews()->create([
            'user_id' => $user->id,
            'product_id' => $productId,
            'review' => $request->review,
            'rating' => $request->rating,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Thanks for your review',
        ]);
    }
    public function reviewByUser(Request $request)
    {
        $user = $request->user();
        $reviews = $user->reviews()->with('product.images')->get();
        return response()->json(
        [
            'reviews' => $reviews
        ]
        );
    }
    public function destroy(Request $request, $productId)
    {
        $user = $request->user();

        $review = $user->reviews()
            ->where('product_id', $productId)
            ->first();

        if (!$review) {
            return response()->json([
                'message' => 'Review not found'
            ], 404);
        }

        $review->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Review deleted successfully'
        ]);
    }
}
