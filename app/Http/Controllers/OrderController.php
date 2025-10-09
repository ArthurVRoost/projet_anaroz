<?php

namespace App\Http\Controllers;

use App\Models\Commande;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Mail;
use App\Mail\OrderConfirmedMail;
class OrderController extends Controller
{
    public function index()
    {
        $bannerImage = asset('storage/banner/offer_img.png');
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
        // ✅ 1. Mise à jour du statut
        $commande->update(['status' => 'confirmed']);

        // ✅ 2. Envoi du mail de confirmation au client
        if ($commande->user && $commande->user->email) {
            Mail::to($commande->user->email)->send(new OrderConfirmedMail($commande));
        }

        // ✅ 3. Retour à la page avec un message de succès
        return back()->with('success', 'Commande validée et email envoyé au client ✅');
    }
}