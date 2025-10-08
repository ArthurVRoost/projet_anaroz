<?php

namespace App\Http\Controllers;

use App\Models\Produit;
use App\Models\ProduitsCategorie;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{

    public function index(){
        $bannerProducts = Produit::where('image1', 'banner_img.png')
            ->orWhere('image1', 'like', 'product_%')
            ->get();

        $imageBaseUrl = asset('storage');

        $featuredProducts = Produit::whereIn('image1', [
            'feature_1.png', 
            'feature_2.png', 
            'feature_3.png', 
            'feature_4.png'
        ])->get()->map(function ($p) use ($imageBaseUrl) {
            // AJOUTE L URL COMPLETE DE L IMAGE FEATURE
            $p->image_url = $imageBaseUrl . '/feature/large/' . $p->image1;
            return $p;
        });

        // RECUPERE 8 PRODUITS DE BASE AVEC IMAGE PRODUCT_
        $baseProducts = Produit::where('image1', 'like', 'product_%')
            ->take(8)
            ->get(); 

        // RECUPERE 2 PRODUITS FEATURE POUR COMPLETER LA SECTION AWESOME SHOP
        $featureProducts = Produit::where('image1', 'like', 'feature_%')
            ->take(2)
            ->get();

        // MERGE LES DEUX LISTES POUR AVOIR UN GROUPE UNIQUE DE PRODUITS
        $awesomeProducts = $baseProducts->merge($featureProducts);

        // AJOUTE L URL COMPLETE DES IMAGES POUR CHAQUE PRODUIT
        $awesomeProducts = $awesomeProducts->map(function ($p) use ($imageBaseUrl) {
            if (str_starts_with($p->image1, 'feature_')) {
                $p->image_url = $imageBaseUrl . '/feature/large/' . $p->image1;
            } else {
                $p->image_url = $imageBaseUrl . '/product/' . $p->image1;
            }
            return $p;
        });

        // RECUPERE LE PRODUIT POUR LA SECTION OFFRE SPECIALE
        $offerProduct = Produit::where('image1', 'offer_img.png')->first();
        $categories = ProduitsCategorie::all();
        
        // RECUPERE LES PRODUITS LES PLUS VENDUS
        $bestSellers = Produit::orderBy('ventes', 'desc')
            ->take(5)
            ->get()
            ->map(function ($p) use ($imageBaseUrl) {
                // AJOUTE LE BON CHEMIN D IMAGE SELON LE PREFIXE
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