<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    protected $table = 'blogs';

    protected $fillable = ['blog_path', 'url', 'titre', 'description', 'blogcategorie_id', 'user_id'];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function categorie(){
        return $this->belongsTo(BlogCategorie::class, 'blogcategorie_id');
    }

    public function tags(){
        return $this->belongsToMany(Tag::class, 'blog_tag');
    }

    public function commentaires(){
        return $this->hasMany(Commentaire::class);
    }
}
