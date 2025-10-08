<?php

namespace App\Http\Controllers;

use App\Models\Produit;
use App\Models\Promo;
use App\Models\Specification;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DetailsController extends Controller
{
    public function show($id)
    {
        $produit = Produit::with(['promo', 'categorie'])->findOrFail($id);
        $specifications = Specification::where('produit_id', $id)->get();

        // CALCULE LE PRIX FINAL AVEC PROMO SI ELLE EXISTE
        $prixFinal = $produit->prix;
        $reduction = null;
        if ($produit->promo_id) {
            $promo = Promo::find($produit->promo_id);
            if ($promo) {
                $reduction = $promo->pourcentage;
                $prixFinal = $produit->prix - ($produit->prix * ($promo->pourcentage / 100));
            }
        }

        // BASE URL DES IMAGES STOCKEES DANS STORAGE
        $baseUrl = asset('storage');
        $paths = [
            'image1' => $produit->image1,
            'image2' => $produit->image2,
            'image3' => $produit->image3,
            'image4' => $produit->image4,
        ];

        // CONSTRUIT LES URLS COMPLETES DES IMAGES
        $produit->images = collect($paths)->map(function ($img) use ($baseUrl) {
            // SI AUCUNE IMAGE RETURN NULL
            if (!$img) return null;

            // SI LE CHEMIN COMMENCE DEJA PAR STORAGE/, ON UTILISE DIRECTEMENT ASSET
            if (str_starts_with($img, 'storage/')) {
                return asset($img);
            }

            // SI LE NOM COMMENCE PAR FEATURE_
            if (str_starts_with($img, 'feature_')) {
                return $baseUrl . '/feature/large/' . $img;
            }

            // SI LE NOM COMMENCE PAR PRODUCT_
            if (str_starts_with($img, 'product_')) {
                return $baseUrl . '/product/' . $img;
            }

            // SI LE NOM COMMENCE PAR BANNER_ OU EGAL A BANNER_IMG.PNG
            if (str_starts_with($img, 'banner_') || $img === 'banner_img.png') {
                return $baseUrl . '/banner/' . $img;
            }

            // SI L IMAGE EST OFFER_IMG.PNG
            if ($img === 'offer_img.png') {
                return $baseUrl . '/offer/' . $img;
            }

            // SI AUCUN CAS NE CORRESPOND, RETOURNE L IMAGE DE BASE
            return $baseUrl . '/' . $img;
        })->filter()->values(); 
        $bannerImage = asset('storage/banner/feature_1.png');

        return Inertia::render('Details', [
            'produit' => $produit,
            'prixFinal' => $prixFinal,
            'reduction' => $reduction,
            'specifications' => $specifications,
            'bannerImage' => $bannerImage,
        ]);
    }
}