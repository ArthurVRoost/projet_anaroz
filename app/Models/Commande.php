<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Commande extends Model
{
    protected $table = 'commandes';

    protected $fillable = ['numRandom', 'prix', 'status', 'user_id', 'payment_method', 'billing_address'];

    protected $casts = ['billing_address' => 'array',];
    public function user(){
        return $this->belongsTo(User::class);
    }

    public function articles(){
        return $this->hasMany(Article::class);
    }
    public function produits(){
        return $this->belongsToMany(Produit::class, 'commande_produit')
                    ->withPivot('quantite', 'prix')
                    ->withTimestamps();
    }
}
