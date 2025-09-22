<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Commentaire extends Model
{
    protected $table = 'commentaires';

    protected $fillable = ['message', 'user_id', 'blog_id'];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function blog(){
        return $this->belongsTo(Blog::class);
    }
}
