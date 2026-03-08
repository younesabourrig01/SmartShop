<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\OrderController;

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
    Route::post('/add', [CartController::class, 'add']);
    Route::put('/update', [CartController::class, 'update']);
    Route::delete('/clear', [CartController::class, 'clear']);

    //order routes
    Route::post('/order', [OrderController::class, 'checkout']);

    // --- 3. ADMIN ONLY ROUTES ---
    Route::middleware('role:admin')->group(function () {
        Route::get('admin/users', [AuthController::class, 'index']);
        Route::get('/admin/orders', [OrderController::class, 'index']);
        Route::get(
            '/admin/orders/date/{date}',
            [OrderController::class, 'ordersByDate']
        );
        Route::patch(
            '/admin/orders/{id}/status',
            [OrderController::class, 'updateStatus']
        );
        Route::get(
            '/admin/orders/report/{date}',
            [OrderController::class, 'downloadReport']
        );
    });

});