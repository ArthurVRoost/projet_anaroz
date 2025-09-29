<?php

namespace App\Http\Controllers;

use App\Models\Produit;
use App\Models\ProduitsCategorie;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProduitController extends Controller
{
   public function index(Request $request)
    {
        $query = Produit::with('categorie');

        // 🔍 Recherche
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('nom', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }

        // 📂 Filtre Catégorie
        if ($request->filled('categorie')) {
            $query->where('produitscategorie_id', $request->categorie);
        }

        // 🎨 Filtre Couleur
        if ($request->filled('couleur')) {
            $query->where('couleur', $request->couleur);
        }

        $produits = $query->paginate(12)->withQueryString();
        $categories = ProduitsCategorie::all();
        $bannerImage = asset('storage/banner/feature_1.png');
        return Inertia::render('Produit', [
            'produits' => $produits,
            'bannerImage' => $bannerImage,
            'categories' => $categories,
            'filters' => $request->only(['search', 'categorie', 'couleur']),
        ]);
    }
}
