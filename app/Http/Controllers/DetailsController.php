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

    // Calcul prix promo si existe
    $prixFinal = $produit->prix;
    $reduction = null;
    if ($produit->promo_id) {
        $promo = Promo::find($produit->promo_id);
        if ($promo) {
            $reduction = $promo->pourcentage;
            $prixFinal = $produit->prix - ($produit->prix * ($promo->pourcentage / 100));
        }
    }

    // ==== Construire URLs images ====
    $baseUrl = asset('storage');
    // ici tu adaptes selon la logique (ex: si image commence par "feature_", tu mets /feature/large)
    $paths = [
        'image1' => $produit->image1,
        'image2' => $produit->image2,
        'image3' => $produit->image3,
        'image4' => $produit->image4,
    ];

    $produit->images = collect($paths)->map(function ($img) use ($baseUrl) {
    if (!$img) return null; // si pas d'image

    // ✅ Si déjà un chemin storage/... => asset direct
    if (str_starts_with($img, 'storage/')) {
        return asset($img);
    }

    if (str_starts_with($img, 'feature_')) {
        return $baseUrl . '/feature/large/' . $img;
    }
    if (str_starts_with($img, 'product_')) {
        return $baseUrl . '/product/' . $img;
    }
    if (str_starts_with($img, 'banner_') || $img === 'banner_img.png') {
        return $baseUrl . '/banner/' . $img;
    }
    if ($img === 'offer_img.png') {
        return $baseUrl . '/offer/' . $img;
    }

        // fallback
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
