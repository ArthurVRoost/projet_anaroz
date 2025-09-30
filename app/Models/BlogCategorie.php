<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BlogCategorie extends Model
{
    protected $table = 'blog_categories';
    protected $fillable = ['nom'];
    public function blogs(){
        return $this->hasMany(Blog::class, 'blogcategorie_id');
    }
}
