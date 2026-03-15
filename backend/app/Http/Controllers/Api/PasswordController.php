<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;

class PasswordController extends Controller
{
    public function getPassword()
    {
        $response = Http::get("http://localhost:8080/password");
        $password = $response->json()['password'];
        return response()->json([
            'password' => $password
        ]);
    }
}
