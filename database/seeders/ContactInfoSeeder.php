<?php

namespace Database\Seeders;

use App\Models\ContactInfo;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ContactInfoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        ContactInfo::insert([
            [
                'rue' => 'Place de la minoterie',
                'ville' => 'Molenbeek',
                'etat_province' => 'Brabant-Flamand',
                'countryCode' => '+32',
                'zip' => '1080',
                'number' => 10,
                'email' => 'AnarozMolengeek@email.com',
                'tel' => '0653543457'
            ]
            ]);
    }
}
