<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Smart Phone',
                'description' => null,
                'image' => null
            ],
            [
                'name' => 'Laptop',
                'description' => null,
                'image' => null
            ],
            [
                'name' => 'Gaming',
                'description' => null,
                'image' => null
            ],
            [
                'name' => 'Headphones',
                'description' => null,
                'image' => null
            ]
        ];

        foreach ($categories as $category) {
            \App\Models\Category::create($category);
        }
    }
}
