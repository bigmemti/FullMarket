<?php

namespace Database\Factories;

use App\Models\Brand;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

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
        return [
            'name' => fake()->word(),
            'slug' => fake()->slug(),
            'sku' => fake()->unique()->numberBetween(10000000000000, 99999999999999),
            'brand_id' => Brand::factory(),
            'category_id' => Category::factory(),
            'image' => fake()->imageUrl(),
            'description' => fake()->text(),
            'price' => fake()->numberBetween(100000, 1000000),
            'discount_price' => fake()->optional(0.3)->numberBetween(100000, 1000000),
            'stock' => fake()->optional(0.8)->numberBetween(1, 100),
            'is_active' => fake()->boolean(),
        ];
    }
}
