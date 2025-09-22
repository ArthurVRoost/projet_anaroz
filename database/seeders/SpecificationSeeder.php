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
                'width' => 1,
                'height' => 1,
                'depth' => 1,
                'weight' => 1,
                'quality_check' => false,
                'produit_id' => 1,
            ]
        ]);
    }
}
