<?php

namespace App\Http\Controllers;

use App\Models\Commande;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        $bannerImage = asset('storage/banner/offer_img.png');

        // ✅ On récupère les commandes avec l’utilisateur et les produits
        $commandes = Commande::with(['user', 'produits'])
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('OrderAdmin', [
            'bannerImage' => $bannerImage,
            'commandes' => $commandes,
        ]);
    }

    public function updateStatus(Commande $commande)
{
    $commande->update([
        'status' => 'confirmed',
    ]);

    return back(); // Inertia va recharger la page avec les props
}
}