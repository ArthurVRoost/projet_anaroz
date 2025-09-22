<?php

namespace Database\Seeders;

use App\Models\Commentaire;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CommentaireSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Commentaire::insert([
            [
                'message' => 'commentaire test pour le blog dont l id est egale au 1 ',
                'user_id' => 1,
                'blog_id' => 1
            ],
            [
                'message' => 'commentaire test pour le blog dont l id est egale au 2 ',
                'user_id' => 1,
                'blog_id' => 2
            ],
            [
                'message' => 'commentaire test pour le blog dont l id est egale au 3 ',
                'user_id' => 1,
                'blog_id' => 3
            ],
            [
                'message' => 'commentaire test pour le blog dont l id est egale au 4 ',
                'user_id' => 1,
                'blog_id' => 4
            ],
            [
                'message' => 'commentaire test pour le blog dont l id est egale au 5 ',
                'user_id' => 1,
                'blog_id' => 5
            ],
            
        ]);
    }
}
