<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Billing extends Model
{
    protected $table = 'billings';

    protected $fillable = ['tel', 'rue', 'maisonNum', 'ville', 'pays', 'zip', 'user_id'];

    public function user(){
        return $this->belongsTo(User::class);
    }
}
