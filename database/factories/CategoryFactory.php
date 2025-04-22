<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Category;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
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
            'parent_id' => fake()->randomElement([...Category::pluck('id'), null]),
            'slug' => fake()->slug(),
            'image' => fake()->imageUrl(),
            'is_active' => fake()->boolean(),
        ];
    }
}
