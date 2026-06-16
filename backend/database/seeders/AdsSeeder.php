<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Ad;

class AdsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Sliders
        Ad::firstOrCreate(
            ['title' => 'Summer Mega Sale'],
            [
                'position' => 'slider',
                'description' => 'Get up to 50% off on all summer collections. Hurry up!',
                'image' => null, // The frontend will fallback to our new placeholder.svg
            ]
        );

        Ad::firstOrCreate(
            ['title' => 'New Tech Arrivals'],
            [
                'position' => 'slider',
                'description' => 'Discover the latest smart devices and gadgets today.',
                'image' => null,
            ]
        );

        // Banners
        Ad::firstOrCreate(
            ['title' => 'Free Shipping'],
            [
                'position' => 'banner',
                'description' => 'On all orders over $100.',
                'image' => null,
            ]
        );

        Ad::firstOrCreate(
            ['title' => 'Member Discount'],
            [
                'position' => 'banner',
                'description' => 'Join now and get 15% off your first purchase.',
                'image' => null,
            ]
        );
    }
}
