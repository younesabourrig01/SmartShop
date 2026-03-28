<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Ad;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AdsController extends Controller
{
    /**
     * Display a listing of the resource (Public).
     * Separated by position.
     */
    public function index()
    {
        $ads = Ad::all();

        return response()->json([
            'status' => 'success',
            'data' => [
                'sliders' => $ads->where('position', 'slider')->values(),
                'banners' => $ads->where('position', 'banner')->values(),
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage (Admin).
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'required_if:position,slider|image|mimes:jpg,jpeg,png|max:2048',
            'position' => 'required|in:slider,banner',
            'description' => 'nullable|string',
        ]);

        $imagePath = $request->hasFile('image') ? $request->file('image')->store('ads', 'public') : null;

        $ad = Ad::create([
            'title' => $request->title,
            'image' => $imagePath,
            'position' => $request->position,
            'description' => $request->description,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Ad created successfully',
            'data' => $ad
        ], 201);
    }

    /**
     * Display the specified resource (Public).
     */
    public function show(Ad $ad)
    {
        return response()->json([
            'status' => 'success',
            'data' => $ad
        ]);
    }

    /**
     * Update the specified resource in storage (Admin).
     */
    public function update(Request $request, $id)
    {
        $ad = Ad::findOrFail($id);

        $request->validate([
            'title' => 'sometimes|string|max:255',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'position' => 'sometimes|in:slider,banner',
            'description' => 'nullable|string',
        ]);

        $data = $request->only(['title', 'position', 'description']);

        if ($request->hasFile('image')) {
            // Delete old image
            if ($ad->image) {
                Storage::disk('public')->delete($ad->image);
            }
            $data['image'] = $request->file('image')->store('ads', 'public');
        }

        $ad->update($data);

        return response()->json([
            'status' => 'success',
            'message' => 'Ad updated successfully',
            'data' => $ad
        ]);
    }

    /**
     * Remove the specified resource from storage (Admin).
     */
    public function destroy($id)
    {
        $ad = Ad::findOrFail($id);

        if ($ad->image) {
            Storage::disk('public')->delete($ad->image);
        }

        $ad->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Ad deleted successfully'
        ]);
    }
}
