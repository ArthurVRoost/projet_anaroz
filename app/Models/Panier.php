<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Panier extends Model
{
    protected $table = 'paniers';

    protected $fillable = ['quantite', 'user_id', 'produit_id'];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function produit(){
        return $this->belongsTo(Produit::class);
    }
}
