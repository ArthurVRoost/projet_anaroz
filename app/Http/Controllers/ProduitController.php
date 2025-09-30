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
        $query = Produit::with(['categorie', 'promo']); // 👈 on charge aussi promo

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

        // URL de base pour les images
        $imageBaseUrl = asset('storage');

        // === Ajouter image_url + gestion promo ===
        $produits->getCollection()->transform(function ($p) use ($imageBaseUrl) {
            // 🔹 Image principale
            if (str_starts_with($p->image1, 'feature_')) {
                $p->image_url = $imageBaseUrl . '/feature/large/' . $p->image1;
            } elseif (str_starts_with($p->image1, 'product_')) {
                $p->image_url = $imageBaseUrl . '/product/' . $p->image1;
            } elseif (str_starts_with($p->image1, 'banner_')) {
                $p->image_url = $imageBaseUrl . '/banner/' . $p->image1;
            } else {
                $p->image_url = $imageBaseUrl . '/' . $p->image1;
            }

            // 🔹 Prix promo si applicable
            $p->prixFinal = $p->prix;
            $p->reduction = null;

            if ($p->promo_id && $p->promo) {
                $p->reduction = $p->promo->pourcentage;
                $p->prixFinal = $p->prix - ($p->prix * ($p->promo->pourcentage / 100));
            }

            return $p;
        });

        // Image de bannière par défaut (exemple)
        $bannerImage = asset('storage/banner/feature_1.png');

        return Inertia::render('Produit', [
            'produits' => $produits,
            'bannerImage' => $bannerImage,
            'categories' => $categories,
            'filters' => $request->only(['search', 'categorie', 'couleur']),
        ]);
    }
}