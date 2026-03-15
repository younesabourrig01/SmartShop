<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ProductImageController;
use App\Http\Controllers\Api\CategoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\WishlistController;
use App\Http\Controllers\Api\PasswordController;

# -------------------------
# 1. PUBLIC ROUTES
# -------------------------

# Auth
Route::post('/send-otp', [AuthController::class, 'sendOtp']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

#generated password
Route::get('/generated-password', [PasswordController::class, 'getPassword']);

# Products (public)
Route::apiResource('products', ProductController::class)
    ->only(['index', 'show']);

# Categories (public)
Route::apiResource('categories', CategoryController::class)
    ->only(['index', 'show']);



# -------------------------
# 2. PROTECTED ROUTES
# -------------------------
Route::middleware('auth:sanctum')->group(function () {

    # profile
    Route::get('/profile', function (Request $request) {
        return $request->user();
    });
    Route::delete('/deleteAccount', [AuthController::class, 'deleteAccount']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::patch('/updateProfile', [AuthController::class, 'updateProfile']);

    # Product's reviews
    Route::get('/products/{product}/reviews', [ReviewController::class, 'productReviews']);
    Route::post('/products/{product}/reviews', [ReviewController::class, 'store']);
    Route::delete('/products/{product}/reviews', [ReviewController::class, 'destroy']);

    #wishlist  
    Route::get('/wishlist', [WishlistController::class, 'index']);
    Route::post('/wishlist/{product}', [WishlistController::class, 'store']);
    Route::delete('/wishlist/{product}', [WishlistController::class, 'destroy']);
    Route::get('/products/{product}/in-wishlist', [WishlistController::class, 'inWishlist']);


    # -------------------------
    # CART 
    # -------------------------
    Route::apiResource('cart', CartController::class)
        ->only(['index', 'store', 'update', 'destroy']);



    # -------------------------
    # ORDER (checkout)
    # -------------------------
    Route::post('/order', [OrderController::class, 'checkout']);



    # -------------------------
    # 3. ADMIN ROUTES
    # -------------------------
    Route::middleware('role:admin')->prefix('admin')->group(function () {

        # users
        Route::get('/users', [AuthController::class, 'index']);

        # orders
        Route::get('/orders', [OrderController::class, 'index']);
        Route::get('/orders/date/{date}', [OrderController::class, 'ordersByDate']);
        Route::patch('/orders/{id}/status', [OrderController::class, 'updateStatus']);
        Route::get('/orders/report/{date}', [OrderController::class, 'downloadReport']);


        # products CRUD
        Route::apiResource('products', ProductController::class)
            ->except(['index', 'show']);


        # categories CRUD
        Route::apiResource('categories', CategoryController::class)
            ->except(['index', 'show']);


        # product images
        Route::post('/products/{product}/images', [ProductImageController::class, 'store']);
        Route::delete('/product-images/{id}', [ProductImageController::class, 'destroy']);

    });

});