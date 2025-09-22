<?php

namespace Database\Seeders;

use App\Models\ProduitsCategorie;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProduitsCategorieSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ProduitsCategorie::insert([
            ['nom' => 'Chaises'],
            ['nom' => 'Buffets'],
            ['nom' => 'Vaisseliers'],
            ['nom' => 'Étagères'],
            ['nom' => 'Bibliothèques'],
            ['nom' => 'Canapés'],
            ['nom' => 'Fauteuils'],
            ['nom' => 'Méridiennes'],
            ['nom' => 'Bureaux'],
            ['nom' => 'Lits'],
            ['nom' => 'Armoires'],
        ]);
    }
}
