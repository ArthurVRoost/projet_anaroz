<?php

namespace App\Http\Controllers;

use App\Models\Commande;
use App\Models\Panier;
use Illuminate\Http\Request;
use Inertia\Inertia;

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

        // CHERCHE SI LE PRODUIT EST DEJA DANS LE PANIER DE L UTILISATEUR
        $panier = Panier::where('user_id', auth()->id())
            ->where('produit_id', $request->produit_id)
            ->first();

        // SI LE PRODUIT EXISTE DEJA, ON AUGMENTE LA QUANTITE
        if ($panier) {
            $panier->increment('quantite');
        } 
        // SINON ON CREE UNE NOUVELLE ENTREE DANS LE PANIER
        else {
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

        // RECHARGE LA PAGE
        return back();
    }

    
    public function destroy(Panier $panier){
        $panier->delete();
        return back();
    }

   
    public function checkout(Request $request){

        $user = auth()->user();

        // RECUPERE TOUS LES PRODUITS DU PANIER AVEC LEUR PROMO SI EXISTE
        $paniers = $user->paniers()->with('produit.promo')->get();

        // SI LE PANIER EST VIDE, REDIRIGE AVEC UN MESSAGE D ERREUR
        if ($paniers->isEmpty()) {
            return redirect()->route('cart')->with('error', 'Votre panier est vide.');
        }

        // INITIALISE LE TOTAL
        $total = 0;

        // CALCULE LE PRIX TOTAL DU PANIER
        foreach ($paniers as $panier) {
            // UTILISE LE PRIX PROMO SI DISPONIBLE SINON LE PRIX NORMAL
            $prix = $panier->produit->promo_prix ?? $panier->produit->prix;
            $total += $prix * $panier->quantite;
        }

        $commande = Commande::create([
            'user_id' => $user->id,
            'numRandom' => random_int(1000000000, 9999999999), // NUMERO UNIQUE
            'prix' => $total,
            'status' => 'pending',
            'billing_address' => $request->billing_address,
            'payment_method' => $request->payment_method,
        ]);

        // AJOUTE CHAQUE PRODUIT DU PANIER DANS LA COMMANDE AVEC QUANTITE ET PRIX
        foreach ($paniers as $panier) {
            $commande->produits()->attach($panier->produit->id, [
                'quantite' => $panier->quantite,
                'prix' => $panier->produit->promo_prix ?? $panier->produit->prix,
            ]);
        }

        // VIDE LE PANIER APRES VALIDATION
        $user->paniers()->delete();

        return Inertia::render('Validation', [
            'commande' => $commande,
        ]);
    }

    public function track(Request $request){
        // CHERCHE LA COMMANDE CORRESPONDANT AU NUMERO ET A L UTILISATEUR
        $commande = Commande::with('produits')
            ->where('numRandom', $request->numRandom)
            ->where('user_id', auth()->id())
            ->first();

        // SI AUCUNE COMMANDE N EST TROUVE, RETOURNE UN MESSAGE D ERREUR
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