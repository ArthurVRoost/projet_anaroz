<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $table = 'tags';
    protected $fillable = ['nom'];

    public function blogs(){
        return $this->belongsToMany(Blog::class, 'blog_tag');
    }
}
