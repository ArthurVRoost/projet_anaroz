<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProduitsCategorie extends Model
{
    protected $table = 'produits_categories';

    protected $fillable = ['nom'];

    public function produits(){
        return $this->hasMany(Produit::class);
    }
}
