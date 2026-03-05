<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CartController;

// --- 1. PUBLIC ROUTES ---

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// --- 2. PROTECTED ROUTES ---
Route::middleware('auth:sanctum')->group(function () {

    // auth routes
    Route::get('/profile', function (Request $request) {
        return $request->user();
    });
    Route::delete('/deleteAccount', [AuthController::class, 'deleteAccount']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::patch('/updateProfile', [AuthController::class, 'updateProfile']);

    //cart routes
    Route::get('/cart', [CartController::class, 'index']);
    // Route::post('/add', [CartController::class, 'add']);
    // Route::put('/update', [CartController::class, 'update']);
    // Route::put('/clear', [CartController::class, 'clear']);

    // --- 3. ADMIN ONLY ROUTES ---
    Route::middleware('role:admin')->group(function () {
        Route::get('/users', [AuthController::class, 'index']);
    });

});