<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    // get all products and controle them by filter
    public function index(Request $request)
    {
        $products = Product::query()
            ->with(['images', 'category'])
            ->when($request->search, function ($query, $search) {
            $query->where('name', 'like', "%{$search}%");
        })
            ->when($request->min_price, function ($query, $minPrice) {
            $query->where('price', '>=', $minPrice);
        })
            ->when($request->max_price, function ($query, $maxPrice) {
            $query->where('price', '<=', $maxPrice);
        })
            ->when($request->category_id && $request->category_id !== 'all', function ($query) use ($request) {
            $query->where('category_id', $request->category_id);
        })
            ->when($request->sort, function ($query, $sort) {
            if ($sort === 'min_price') {
                $query->orderBy('price', 'asc');
            }
            elseif ($sort === 'max_price') {
                $query->orderBy('price', 'desc');
            }
            else {
                $query->orderBy('created_at', 'desc');
            }
        }, function ($query) {
            $query->orderBy('created_at', 'desc');
        })
            ->paginate(12);

        return response()->json([
            'status' => 'success',
            'data' => $products
        ]);
    }

    // show product
    public function show($id)
    {
        $product = Product::with('category', 'images')->findOrFail($id);
        return response()->json([
            'status' => 'success',
            'data' => $product
        ]);
    }


    // crate new product
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'category_id' => 'required|exists:categories,id',
            'images' => 'nullable|array|max:5',
            'images.*' => 'image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $product = Product::create($request->only([
            'name',
            'description',
            'price',
            'stock',
            'category_id'
        ]));

        if ($request->hasFile('images')) {

            foreach ($request->file('images') as $image) {

                // Symbolic Link -> command (php artisan storage:link)
                $path = $image->store('products', 'public');

                $product->images()->create([
                    'image' => $path
                ]);
            }
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Product created successfully',
            'data' => $product->load('images')
        ]);
    }

    // updatre product
    public function update(Request $request, $id)
    {
        $product = Product::with('images')->findOrFail($id);

        $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'price' => 'sometimes|numeric|min:0',
            'stock' => 'sometimes|integer|min:0',
            'category_id' => 'sometimes|exists:categories,id',
            'images' => 'nullable|array',
        ]);

        $product->update($request->only([
            'name',
            'description',
            'price',
            'stock',
            'category_id'
        ]));

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('products', 'public');
                $product->images()->create([
                    'image' => $path
                ]);
            }
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Product updated successfully',
            'data' => $product->load('images')
        ]);
    }

    // delete product
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Product deleted successfully'
        ]);
    }
}
