<?php

namespace Database\Factories;

use App\Models\Institution;
use Illuminate\Database\Eloquent\Factories\Factory;

class InstitutionFactory extends Factory
{
    protected $model = Institution::class;

    public function definition()
    {
        return [
            'name' => $this->faker->company,
            'parent_id' => null,  // Varsayılan olarak ana kurum
        ];
    }

    /**
     * Alt kurumları oluşturmak için bir durum tanımlıyoruz.
     */
    public function withParent(Institution $parent)
    {
        return $this->state([
        ]);
    }
}
