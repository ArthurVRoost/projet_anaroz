<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $table = 'articles';

    protected $fillable = ['nom', 'prix', 'quantite', 'commande_id', 'produit_id'];

    public function commande(){
        return $this->belongsTo(Commande::class);
    }

    public function produit(){
        return $this->belongsTo(Produit::class);
    }
}
