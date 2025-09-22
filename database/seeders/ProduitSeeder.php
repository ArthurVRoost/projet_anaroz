<?php

namespace Database\Seeders;

use App\Models\Produit;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProduitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    //  Schema::create('produits', function (Blueprint $table) {
    //         $table->id();
    //         $table->string('nom');
    //         $table->decimal('prix', 8,2);
    //         $table->unsignedBigInteger('stock');
    //         $table->boolean('isPinned')->default(false);
    //         $table->string('image1');
    //         $table->string('image2')->nullable();
    //         $table->string('image3')->nullable();
    //         $table->string('image4')->nullable();
    //         $table->string('couleur');
    //         $table->text('description');
    //         $table->foreignId('produitscategorie_id')->nullable()->constrained('produits_categories')->nullOnDelete();
    //         $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
    //         $table->foreignId('promo_id')->nullable()->constrained('promos')->nullOnDelete();
    //         $table->timestamps();
    //     });
    public function run(): void
    {
        Produit::insert([
            [
                'nom' => '',
                'prix' => '',
                'stock' => '',
                'isPinned' => '',
                'image1' => '',
                'image2' => '',
                'image3' => '',
                'image4' => '',
                'couleur' => '',
                'description' => '',
                'produitscategorie_id' => '',
                'user_id' => '',
                'promo_id' => '',
            ],
        ]);
    }
}
