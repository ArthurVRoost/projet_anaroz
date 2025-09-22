<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'nom',
        'prenom',
        'pseudo',
        'email',
        'password',
        'user_path', 
        'role_id'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    public function role(){
        return $this->belongsTo(Role::class);
    }
    public function blogs(){
        return $this->hasMany(Blog::class);
    }

    public function commentaires(){
        return $this->hasMany(Commentaire::class);
    }

    public function produits(){
        return $this->hasMany(Produit::class);
    }

    public function produitsFavoris(){
        return $this->belongsToMany(Produit::class, 'produit_user');
    }

    public function paniers(){
        return $this->hasMany(Panier::class);
    }

    public function commandes(){
        return $this->hasMany(Commande::class);
    }

    public function billing(){
        return $this->hasOne(Billing::class);
    }
}
