<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use DB;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        $this->call(RoleSeeder::class);
        User::factory()->create([
            'nom' => 'Dupont',
            'prenom' => 'Jean',
            'pseudo' => 'Goat',
            'role_id' => 6,
            'email' => 'test@example.com',
        ]);
        $this->call([
            BlogCategorieSeeder::class,
            BlogSeeder::class,
            TagSeeder::class,
            CommentaireSeeder::class,
            ContactInfoSeeder::class,
            ProduitsCategorieSeeder::class,
            PromoSeeder::class,
            ProduitSeeder::class,
            SpecificationSeeder::class,

        ]);
        // MANY TO MANY, ON LINK A L'AVANCE DEJA CE QUI EST LINK DE PART LES SEEDERS
        DB::table('blog_tag')->insert([
            
            ['blog_id' => 1, 'tag_id' => 2],
            ['blog_id' => 1, 'tag_id' => 12],

            ['blog_id' => 2, 'tag_id' => 3],

            ['blog_id' => 3, 'tag_id' => 1],

            ['blog_id' => 4, 'tag_id' => 9],

            ['blog_id' => 5, 'tag_id' => 4],
            ['blog_id' => 5, 'tag_id' => 11],
        ]);
    }
}
