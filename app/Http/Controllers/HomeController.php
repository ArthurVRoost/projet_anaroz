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
        
        // Récupérer les produits featured (avec images feature_)
        $featuredProducts = Produit::whereIn('image1', [
            'feature_1.png', 
            'feature_2.png', 
            'feature_3.png', 
            'feature_4.png'
        ])->get();
        
        // Récupérer les produits pour la section "Awesome Shop" (8 premiers produits avec product_)
        $shopProducts = Produit::where('image1', 'like', 'product_%')
            ->take(8)
            ->get();
        
        // Récupérer les best sellers (5 premiers produits)
        $bestSellers = Produit::where('image1', 'like', 'product_%')
            ->take(5)
            ->get();
        
        // Récupérer le produit pour l'offre spéciale
        $offerProduct = Produit::where('image1', 'offer_img.png')->first();
        
        // Récupérer toutes les catégories
        $categories = ProduitsCategorie::all();
        
        // URL de base pour les images
        $imageBaseUrl = asset('storage');
        
        return Inertia::render('Home', compact(
            'bannerProducts',
            'featuredProducts',
            'shopProducts',
            'bestSellers',
            'offerProduct',
            'categories',
            'imageBaseUrl'
        ));
    }
}