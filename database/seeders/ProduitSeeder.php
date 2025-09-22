<!-- 
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
    //     }); -->


<?php

namespace Database\Seeders;

use App\Models\Produit;
use Illuminate\Database\Seeder;

class ProduitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Produit::insert(
            [
            [
                'name' => 'Fauteuil Cuir Vintage',
                'description' => 'Fauteuil en cuir de style vintage, confortable et robuste.',
                'price' => 349.00,
                'stock' => 12,
                'image1' => 'product_1.png',
                'image3' => 'product_1.png',
                'image4' => 'product_1.png',
                'image2' => 'product_1.png',
                
            ],
            [
                'name' => 'Chaise Scandinave Bois',
                'description' => 'Chaise légère en bois inspirée du design scandinave.',
                'price' => 129.00,
                'stock' => 30,
                'image1' => 'product_2.png',
                'image3' => 'product_2.png',
                'image4' => 'product_2.png',
                'image2' => 'product_2.png',
                
            ],
            [
                'name' => 'Table Basse Industrielle',
                'description' => 'Table basse avec plateau en bois et pieds en métal.',
                'price' => 199.00,
                'stock' => 8,
                'image1' => 'product_3.png',
                'image3' => 'product_3.png',
                'image4' => 'product_3.png',
                'image2' => 'product_3.png',
                
            ],
            [
                'name' => 'Lampe Suspension Moderne',
                'description' => 'Lampe suspension pour salon, éclairage doux et design.',
                'price' => 89.00,
                'stock' => 25,
                'image1' => 'product_4.png',
                'image3' => 'product_4.png',
                'image4' => 'product_4.png',
                'image2' => 'product_4.png',

            ],
            [
                'name' => 'Bibliothèque Étagère Bois',
                'description' => 'Grande bibliothèque modulable pour bureau ou salon.',
                'price' => 259.00,
                'stock' => 6,
                'image1' => 'product_5.png',
                'image3' => 'product_5.png',
                'image4' => 'product_5.png',
                'image2' => 'product_5.png',
            ],
            [
                'name' => 'Pouff Chesterfield',
                'description' => 'Pouff confortable en tissu rare avec finitions soignées.',
                'price' => 189.00,
                'stock' => 15,

                'image1' => 'product_6.png',
                'image3' => 'product_6.png',
                'image4' => 'product_6.png',
                'image2' => 'product_6.png',

            ],
            [
                'name' => 'Étagère Murale Design',
                'description' => 'Étagère murale moderne pour optimiser l\'espace.',
                'price' => 79.00,
                'stock' => 20,

                'image1' => 'product_7.png',
                'image3' => 'product_7.png',
                'image4' => 'product_7.png',
                'image2' => 'product_7.png',
                
            ],
            [
                'name' => 'Fauteuil Rotin Naturel',
                'description' => 'Fauteuil en rotin tressé naturel, style bohème chic.',
                'price' => 299.00,
                'stock' => 10,

                'image1' => 'product_8.png',
                'image3' => 'product_8.png',
                'image4' => 'product_8.png',
                'image2' => 'product_8.png',
                
            ],
            [
                'name' => 'Chaise Bureau Moderne',
                'description' => 'Chaise de bureau ergonomique avec dossier réglable.',
                'price' => 179.00,
                'stock' => 18,

                'image1' => 'product_9.png',
                'image3' => 'product_9.png',
                'image4' => 'product_9.png',
                'image2' => 'product_9.png',
                
            ],
        ]); 

    }
}