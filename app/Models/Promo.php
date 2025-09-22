<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Promo extends Model
{
    protected $table = 'promos';

    protected $fillable = ['nom', 'pourcentage'];

    public function produits(){
        return $this->hasMany(Produit::class);
    }
}
