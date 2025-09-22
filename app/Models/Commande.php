<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Commande extends Model
{
    protected $table = 'commandes';

    protected $fillable = ['numRandom', 'prix', 'status', 'user_id'];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function articles(){
        return $this->hasMany(Article::class);
    }
}
