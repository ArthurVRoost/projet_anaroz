<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Specification extends Model
{
    protected $table = 'specifications';

    protected $fillable = ['width','height','depth','weight','quality_check','produit_id'];

    public function produit(){
        return $this->belongsTo(Produit::class);
    }
}
