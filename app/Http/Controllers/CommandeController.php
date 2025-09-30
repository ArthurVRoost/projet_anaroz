<?php

namespace App\Http\Controllers;

use App\Models\Commande;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CommandeController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        $commandes = Commande::with('produits')
            ->where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Order', [
            'commandes' => $commandes,
        ]);
    }
}
