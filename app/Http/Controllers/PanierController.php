<?php

namespace App\Http\Controllers;

use App\Models\Commande;
use App\Models\Panier;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Mail;
use App\Mail\OrderReceivedMail;

class PanierController extends Controller
{
    public function index(){
        $paniers = auth()->user()->paniers()->with('produit')->get();
        return Inertia::render('Panier', [
            'paniers' => $paniers,
        ]);
    }

    public function store(Request $request){
        $request->validate([
            'produit_id' => 'required|exists:produits,id',
        ]);

        $panier = Panier::where('user_id', auth()->id())
            ->where('produit_id', $request->produit_id)
            ->first();

        if ($panier) {
            $panier->increment('quantite');
        } else {
            Panier::create([
                'user_id' => auth()->id(),
                'produit_id' => $request->produit_id,
                'quantite' => 1,
            ]);
        }

        return redirect()->route('cart');
    }

    public function update(Request $request, Panier $panier){
        $request->validate([
            'quantite' => 'required|integer|min:1',
        ]);

        $panier->update(['quantite' => $request->quantite]);
        return back();
    }

    public function destroy(Panier $panier){
        $panier->delete();
        return back();
    }

    public function checkout(Request $request){
        $user = auth()->user();
        $paniers = $user->paniers()->with('produit.promo')->get();

        if ($paniers->isEmpty()) {
            return redirect()->route('cart')->with('error', 'Votre panier est vide.');
        }

        $total = 0;

        foreach ($paniers as $panier) {
            $prix = $panier->produit->promo_prix ?? $panier->produit->prix;
            $total += $prix * $panier->quantite;
        }

        $commande = Commande::create([
            'user_id' => $user->id,
            'numRandom' => random_int(1000000000, 9999999999),
            'prix' => $total,
            'status' => 'pending',
            'billing_address' => $request->billing_address,
            'payment_method' => $request->payment_method,
        ]);

        foreach ($paniers as $panier) {
            $commande->produits()->attach($panier->produit->id, [
                'quantite' => $panier->quantite,
                'prix' => $panier->produit->promo_prix ?? $panier->produit->prix,
            ]);
        }

        // 🧹 Vide le panier après validation
        $user->paniers()->delete();

        // ✉️ Envoie du mail de confirmation
        Mail::to($user->email)->send(new OrderReceivedMail($commande));

        // ✅ Affiche la page de validation
        return Inertia::render('Validation', [
            'commande' => $commande,
        ]);
    }

    public function track(Request $request){
        $commande = Commande::with('produits')
            ->where('numRandom', $request->numRandom)
            ->where('user_id', auth()->id())
            ->first();

        if (!$commande) {
            return Inertia::render('Track', [
                'error' => 'Aucune commande trouvee avec ce numero.'
            ]);
        }

        return Inertia::render('Track', [
            'commande' => $commande,
        ]);
    }
}