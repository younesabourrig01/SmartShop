<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductImageController extends Controller
{
    public function store(Request $request, $productId)
    {
        $product = Product::findOrFail($productId);

        if ($product->images()->count() >= 5) {
            return response()->json([
                'message' => 'Maximum 5 images allowed'
            ], 422);
        }

        $request->validate([
            'image' => 'required|image|mimes:jpg,jpeg,png|max:2048'
        ]);

        $path = $request->file('image')->store('products', 'public');

        $image = $product->images()->create([
            'image' => $path
        ]);

        return response()->json([
            'status' => 'success',
            'data' => $image
        ]);
    }
    public function destroy($id)
    {
        $image = ProductImage::findOrFail($id);

        Storage::disk('public')->delete($image->image);

        $image->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Image deleted'
        ]);
    }

}
