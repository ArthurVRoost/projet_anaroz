<?php

namespace Database\Seeders;

use App\Models\BlogCategorie;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BlogCategorieSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        BlogCategorie::insert([
            ['nom' => 'Travel'],
            ['nom' => 'Health Care'],
            ['nom' => 'Discover'],
            ['nom' => 'Fashion'],
            ['nom' => 'Business'],
        ]);
    }
}
