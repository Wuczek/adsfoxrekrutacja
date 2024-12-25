<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ChannelFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name'         => $this->faker->company,
            'client_count' => $this->faker->numberBetween(0, 1000)
        ];
    }
}
