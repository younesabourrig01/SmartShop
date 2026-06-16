<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AccountsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Create Admin
        User::firstOrCreate(
            ['email' => 'admin@smartshop.com'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('password123'),
                'adress' => 'Admin HQ',
                'phone_number' => '1234567890',
                'role' => 'admin',
                'email_verified_at' => now(),
            ]
        );

        // Create Regular User
        User::firstOrCreate(
            ['email' => 'user@smartshop.com'],
            [
                'name' => 'Regular User',
                'password' => Hash::make('password123'),
                'adress' => 'User Address',
                'phone_number' => '0987654321',
                'role' => 'user',
                'email_verified_at' => now(),
            ]
        );
    }
}
