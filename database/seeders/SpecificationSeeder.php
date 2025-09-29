<?php

namespace Database\Seeders;

use App\Models\Specification;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SpecificationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    // Schema::create('specifications', function (Blueprint $table) {
    //         $table->id();
    //         $table->decimal('width', 8, 2);
    //         $table->decimal('height', 8, 2);
    //         $table->decimal('depth', 8, 2);
    //         $table->decimal('weight', 8, 2);
    //         $table->boolean('quality_check')->default(false);
    //         $table->foreignId('produit_id')->constrained('produits');
    //         $table->timestamps();
    //     });
    public function run(): void
    {
        Specification::insert([
            [
                'width' => 200,
                'height' => 50,
                'depth' => 100,
                'weight' => 40,
                'quality_check' => true,
                'produit_id' => 1,
            ],
             [
                'width' => 50,
                'height' => 100,
                'depth' => 50,
                'weight' => 5,
                'quality_check' => true,
                'produit_id' => 2,
            ],
             [
                'width' => 150,
                'height' => 50,
                'depth' => 150,
                'weight' => 60,
                'quality_check' => true,
                'produit_id' => 3,
            ],
             [
                'width' => 20,
                'height' => 40,
                'depth' => 20,
                'weight' => 5,
                'quality_check' => true,
                'produit_id' => 4,
            ],
             [
                'width' => 300,
                'height' => 200,
                'depth' => 120,
                'weight' => 80,
                'quality_check' => true,
                'produit_id' => 5,
            ],
             [
                'width' => 100,
                'height' => 50,
                'depth' => 100,
                'weight' => 20,
                'quality_check' => true,
                'produit_id' => 6,
            ],
             [
                'width' => 200,
                'height' => 150,
                'depth' => 60,
                'weight' => 50,
                'quality_check' => true,
                'produit_id' => 7,
            ],
             [
                'width' => 70,
                'height' => 160,
                'depth' => 70,
                'weight' => 50,
                'quality_check' => true,
                'produit_id' => 8,
            ],
             [
                'width' => 40,
                'height' => 50,
                'depth' => 30,
                'weight' => 7,
                'quality_check' => true,
                'produit_id' => 9,
            ],
            [
                'width' => 40,
                'height' => 50,
                'depth' => 30,
                'weight' => 7,
                'quality_check' => true,
                'produit_id' => 10,
            ],
            [
                'width' => 40,
                'height' => 50,
                'depth' => 30,
                'weight' => 7,
                'quality_check' => true,
                'produit_id' => 11,
            ],

            [
                'width' => 40,
                'height' => 50,
                'depth' => 30,
                'weight' => 7,
                'quality_check' => true,
                'produit_id' => 12,
            ],
            [
                'width' => 40,
                'height' => 50,
                'depth' => 30,
                'weight' => 7,
                'quality_check' => true,
                'produit_id' => 13,
            ],
            [
                'width' => 40,
                'height' => 50,
                'depth' => 30,
                'weight' => 7,
                'quality_check' => true,
                'produit_id' => 14,
            ],
            [
                'width' => 40,
                'height' => 50,
                'depth' => 30,
                'weight' => 7,
                'quality_check' => true,
                'produit_id' => 15,
            ],
        ]);
    }
}
