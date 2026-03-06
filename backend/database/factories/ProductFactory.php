<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Category;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->unique()->words(3, true);
        return [
            'name' => ucfirst($name),
            'description' => fake()->paragraph(),
            'price' => fake()->randomFloat(2, 10, 500),
            'stock' => fake()->numberBetween(0, 100),
            'category_id' => Category::inRandomOrder()->first()->id,
        ];
    }
}
