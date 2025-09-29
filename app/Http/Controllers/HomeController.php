<?php

namespace App\Http\Controllers;

use App\Models\Produit;
use App\Models\ProduitsCategorie;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Afficher la page d'accueil
     */
    public function index()
    {
        // Récupérer les produits pour le carousel banner
        $bannerProducts = Produit::where('image1', 'banner_img.png')
            ->orWhere('image1', 'like', 'product_%')
            ->get();
        // URL de base pour les images
        $imageBaseUrl = asset('storage');
        // Récupérer les produits featured (avec images feature_)
        $featuredProducts = Produit::whereIn('image1', [
            'feature_1.png', 
            'feature_2.png', 
            'feature_3.png', 
            'feature_4.png'
        ])->get()->map(function ($p) use ($imageBaseUrl) {
            $p->image_url = $imageBaseUrl . '/feature/large/' . $p->image1;
            return $p;
        });
        // Récupérer les produits pour la section "Awesome Shop" (8 premiers produits avec product_)
        $baseProducts = Produit::where('image1', 'like', 'product_%')
            ->take(8)
            ->get(); 
        $featureProducts = Produit::where('image1', 'like', 'feature_%')
            ->take(2)
            ->get();

        $awesomeProducts = $baseProducts->merge($featureProducts);
        $awesomeProducts = $awesomeProducts->map(function ($p) use ($imageBaseUrl) {
            if (str_starts_with($p->image1, 'feature_')) {
                $p->image_url = $imageBaseUrl . '/feature/large/' . $p->image1;
            } else {
                $p->image_url = $imageBaseUrl . '/product/' . $p->image1;
            }
            return $p;
        });
        // Récupérer le produit pour l'offre spéciale
        $offerProduct = Produit::where('image1', 'offer_img.png')->first();
        
        // Récupérer toutes les catégories
        $categories = ProduitsCategorie::all();
        
        $bestSellers = Produit::orderBy('ventes', 'desc')
            ->take(5)
            ->get()
            ->map(function ($p) use ($imageBaseUrl) {
                if (str_starts_with($p->image1, 'feature_')) {
                    $p->image_url = $imageBaseUrl . '/feature/large/' . $p->image1;
                } elseif (str_starts_with($p->image1, 'product_')) {
                    $p->image_url = $imageBaseUrl . '/product/' . $p->image1;
                } elseif ($p->image1 === 'offer_img.png') {
                    $p->image_url = $imageBaseUrl . '/offer/' . $p->image1;
                } elseif ($p->image1 === 'banner_img.png') {
                    $p->image_url = $imageBaseUrl . '/banner/' . $p->image1;
                } else {
                    $p->image_url = $imageBaseUrl . '/' . $p->image1;
                }
                return $p;
            });
        
        
        return Inertia::render('Home', compact(
            'bannerProducts',
            'featuredProducts',
            'bestSellers',
            'offerProduct',
            'categories',
            'imageBaseUrl',
            'awesomeProducts',
        ));
    }
}