<?php

namespace Database\Seeders;

use App\Models\Promo;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PromoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Promo::insert([
            [
                'nom' => 'GaryGoat',
                'pourcentage' => 80
            ],
            [
                'nom' => 'Arthur',
                'pourcentage' => 20
            ],
            [
                'nom' => 'CS35',
                'pourcentage' => 10
            ],
        ]);
    }
}
