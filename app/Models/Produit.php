<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Produit extends Model
{
    protected $table = 'produits';

    protected $fillable = ['nom','prix','stock','isPinned','image1','image2','image3','image4','couleur','description','produitscategorie_id','user_id', 'promo_id', 'ventes'];

    public function categorie(){
        return $this->belongsTo(ProduitsCategorie::class, 'produitscategorie_id');
    }

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function specifications(){
        return $this->hasOne(Specification::class);
    }

    public function users(){
        return $this->belongsToMany(User::class, 'produit_user');
    }

    public function paniers(){
        return $this->hasMany(Panier::class);
    }

    public function articles(){
        return $this->hasMany(Article::class);
    }
    public function promo(){
        return $this->belongsTo(Promo::class);
    }

    public function getPromoPrixAttribute()
{
    if ($this->promo) {
        return $this->prix - ($this->prix * ($this->promo->pourcentage / 100));
    }
    return null; // pas de promo → on garde prix normal
}
}
