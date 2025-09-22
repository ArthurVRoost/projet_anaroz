<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactInfo extends Model
{
    protected $table = 'contact_infos';
    protected $fillable = ['rue', 'etat_province', 'ville', 'countryCode', 'zip', 'number', 'email', 'tel'];
}
