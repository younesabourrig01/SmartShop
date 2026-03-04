<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{
    public function index()
    {
        // whithCount generate products_count -> show how many product category has
        $categories = Category::whithCount('products')->get();
        return response()->json([
            'status' => 'success',
            'data' => $categories,
        ]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:categories,name',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'description' => 'nullable|string',
        ]);

        $imagePath = null;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('categories', 'public');
        }

        $category = Category::create([
            'name' => $request->name,
            'description' => $request->description,
            'image' => $imagePath
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Category Created successfuly',
            'data' => $category,
        ]);
    }
    public function show($id)
    {
        $category = Category::with('products')->findOrFail($id);
        return response()->json([
            'status' => 'success',
            'data' => $category
        ]);
    }

    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);
        $request->validate([
            // verify if the new name exests with auther ids and ignore the current one we update
            'name' => 'required|string|max:255|unique:categories,name,' . $id,
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048'
        ]);

        $data = [
            'name' => $request->name ?? $category->name,
            'description' => $request->description ?? $category->description,
        ];

        if ($request->hasFile('image')) {

            if ($category->image) {
                Storage::disk('public')->delete($category->image);
            }

            $data['image'] = $request->file('image')
                ->store('categories', 'public');
        }

        $category->update($data);

        return response()->json([
            'status' => 'success',
            'message' => 'Category updated successfully',
            'data' => $category
        ]);
    }

    public function destroy($id)
    {
        $category = Category::findOrFail($id);

        $category->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Category deleted successfully'
        ]);
    }

}
