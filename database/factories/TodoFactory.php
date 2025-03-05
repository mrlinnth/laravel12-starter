<?php

namespace Database\Factories;

use App\Enums\TodoStatusEnum;
use App\Models\Todo;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class TodoFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Todo::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'name' => fake()->sentence(1),
            'content' => fake()->paragraphs(3, true),
            'creator_id' => User::factory(),
            'status' => fake()->randomElement(array_column(TodoStatusEnum::cases(), 'value')),
        ];
    }
}
