<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::insert([
            // guest
            ['nom' => 'Public'],
            // acheter, commenter blog, track orders
            ['nom' => 'User'],
            // tous les crud blog + créer des tag
            ['nom' => 'Community Manager'],
            // peut voir les commandes et changer leur statut + peut envoyer des mails depuis le dashboard
            ['nom' => 'Agent'],
            // create + update produit, peut pin produit sur carou home, manage stock, modifie contact details
            ['nom' => 'Webmaster'],
            
            ['nom' => 'Admin'],
        ]);
    }
}
