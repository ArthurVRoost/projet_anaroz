<?php

namespace Database\Seeders;

use App\Models\Blog;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BlogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Blog::insert([
            [
                'blog_path' => 'storage/blog/m-blog-1.jpg',
                'url' => null,
                'titre' => 'Aranoz grand opening party',
                'description' => 'MCSE boot camps have its supporters and its detractors. Some people do not understand why you should have to spend money on boot camp when you can get the MCSE study materials yourself at a fraction of the camp price. However, who has the willpower to actually sit through a self-imposed MCSE training. Who has the willpower to actually. ',
                'blogcategorie_id' => 5,
                'user_id' => 1
            ],
            [
                'blog_path' => 'storage/blog/m-blog-2.jpg',
                'url' => null,
                'titre' => 'Smartphones working on the moon ?',
                'description' => 'MCSE boot camps have its supporters and its detractors. Some people do not understand why you should have to spend money on boot camp when you can get the MCSE study materials yourself at a fraction of the camp price. However, who has the willpower to actually sit through a self-imposed MCSE training. Who has the willpower to actually. ',
                'blogcategorie_id' => 3,
                'user_id' => 1
            ],
            [
                'blog_path' => 'storage/blog/m-blog-3.jpg',
                'url' => null,
                'titre' => "Today's Fashion first tour",
                'description' => 'MCSE boot camps have its supporters and its detractors. Some people do not understand why you should have to spend money on boot camp when you can get the MCSE study materials yourself at a fraction of the camp price. However, who has the willpower to actually sit through a self-imposed MCSE training. Who has the willpower to actually. ',
                'blogcategorie_id' => 4,
                'user_id' => 1
            ],
            [
                'blog_path' => 'storage/blog/m-blog-4.jpg',
                'url' => null,
                'titre' => 'This daily cup of coffee could save your life !',
                'description' => 'MCSE boot camps have its supporters and its detractors. Some people do not understand why you should have to spend money on boot camp when you can get the MCSE study materials yourself at a fraction of the camp price. However, who has the willpower to actually sit through a self-imposed MCSE training. Who has the willpower to actually. ',
                'blogcategorie_id' => 2,
                'user_id' => 1
            ],
            [
                'blog_path' => 'storage/blog/m-blog-5.jpg',
                'url' => null,
                'titre' => 'Cup cakes & donuts worldwide consumption is growing',
                'description' => 'MCSE boot camps have its supporters and its detractors. Some people do not understand why you should have to spend money on boot camp when you can get the MCSE study materials yourself at a fraction of the camp price. However, who has the willpower to actually sit through a self-imposed MCSE training. Who has the willpower to actually. ',
                'blogcategorie_id' => 5,
                'user_id' => 1
            ],
        ]);
    }
}
