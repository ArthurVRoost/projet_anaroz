<?php

namespace App\Http\Controllers;

use App\Models\Produit;
use App\Models\ProduitsCategorie;
use App\Models\Promo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProduitController extends Controller
{
    public function index(Request $request)
    {
        $query = Produit::with(['categorie', 'promo']); 

        // SEARCH
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('nom', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }

        // FILTRE CAT
        if ($request->filled('categorie')) {
            $query->where('produitscategorie_id', $request->categorie);
        }

        // FILTRE COULEUR
        if ($request->filled('couleur')) {
            $query->where('couleur', $request->couleur);
        }

        $produits = $query->paginate(40)->withQueryString();
        $categories = ProduitsCategorie::all();
        $imageBaseUrl = asset('storage');

    
        $produits->getCollection()->transform(function ($p) use ($imageBaseUrl) {

        if ($p->image1 && str_starts_with($p->image1, 'storage/')) {
            $p->image_url = asset($p->image1);
        } else {
        
            if (str_starts_with($p->image1, 'feature_')) {
                $p->image_url = $imageBaseUrl . '/feature/large/' . $p->image1;
            } elseif (str_starts_with($p->image1, 'product_')) {
                $p->image_url = $imageBaseUrl . '/product/' . $p->image1;
            } elseif (str_starts_with($p->image1, 'banner_')) {
                $p->image_url = $imageBaseUrl . '/banner/' . $p->image1;
            } else {
                $p->image_url = $imageBaseUrl . '/' . $p->image1;
            }
        }

        // GESTION PROMO
        $p->prixFinal = $p->prix;
        $p->reduction = null;
        if ($p->promo_id && $p->promo) {
            $p->reduction = $p->promo->pourcentage;
            $p->prixFinal = $p->prix - ($p->prix * ($p->promo->pourcentage / 100));
        }

        return $p;
    });

    
        $bannerImage = asset('storage/banner/feature_1.png');

        return Inertia::render('Produit', [
            'produits' => $produits,
            'bannerImage' => $bannerImage,
            'categories' => $categories,
            'filters' => $request->only(['search', 'categorie', 'couleur']),
        ]);
    }
}