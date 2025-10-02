<?php

namespace App\Http\Controllers;

use App\Models\Produit;
use App\Models\ProduitsCategorie;
use App\Models\Promo;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ProduitadminController extends Controller
{
    public function index()
{
    $bannerImage = asset('storage/banner/offer_img.png');
    $produits = Produit::with(['categorie', 'user', 'promo'])->latest()->get();
    $categories = ProduitsCategorie::all();
    $promos = Promo::all();

    $imageBaseUrl = asset('storage');

    // Ajouter un champ image_url
    $produits->transform(function ($p) use ($imageBaseUrl) {
        if (!$p->image1) {
            $p->image_url = $imageBaseUrl . '/default.png'; // fallback
        } elseif (str_starts_with($p->image1, 'storage/')) {
            // Déjà un chemin "storage/..." => on fait juste asset()
            $p->image_url = asset($p->image1);
        } elseif (str_starts_with($p->image1, 'feature_')) {
            $p->image_url = $imageBaseUrl . '/feature/large/' . $p->image1;
        } elseif (str_starts_with($p->image1, 'product_')) {
            $p->image_url = $imageBaseUrl . '/product/' . $p->image1;
        } elseif (str_starts_with($p->image1, 'banner_')) {
            $p->image_url = $imageBaseUrl . '/banner/' . $p->image1;
        } else {
            $p->image_url = $imageBaseUrl . '/' . $p->image1;
        }
        return $p;
    });

    return Inertia::render('AdminProduit', [
        'bannerImage' => $bannerImage,
        'produits' => $produits,
        'categories' => $categories,
        'promos' => $promos,
    ]);
}

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'nom' => 'required|string|max:255',
                'description' => 'required|string',
                'prix' => 'required|numeric|min:0',
                'stock' => 'required|integer|min:0',
                'couleur' => 'required|string|max:50',
                'produitscategorie_id' => 'required|exists:produits_categories,id',
                'promo_id' => 'nullable|exists:promos,id',
                'image1' => 'required|image|max:2048',
                'image2' => 'nullable|image|max:2048',
                'image3' => 'nullable|image|max:2048',
                'image4' => 'nullable|image|max:2048',
            ]);

            $images = [];
            // Image1 obligatoire
            $path1 = $request->file('image1')->store('produits', 'public');
            $images['image1'] = "storage/$path1";

            // Images optionnelles
            foreach (['image2', 'image3', 'image4'] as $imageField) {
                if ($request->hasFile($imageField)) {
                    $path = $request->file($imageField)->store('produits', 'public');
                    $images[$imageField] = "storage/$path";
                } else {
                    $images[$imageField] = null;
                }
            }
            \Log::info('Données envoyées:', $validated + [
                'user_id' => auth()->id(),
                'images' => $images,
            ]);
            Produit::create([
                'nom' => $validated['nom'],
                'description' => $validated['description'],
                'prix' => $validated['prix'],
                'stock' => $validated['stock'],
                'couleur' => $validated['couleur'],
                'produitscategorie_id' => $validated['produitscategorie_id'],
                'promo_id' => $validated['promo_id'] ?? null,
                'user_id' => auth()->id(),
                'ventes' => 0,
                'isPinned' => false,
                'image1' => $images['image1'],
                'image2' => $images['image2'],
                'image3' => $images['image3'],
                'image4' => $images['image4'],
            ]);

            return redirect()->back()->with('success', 'Produit créé avec succès !');
            
        } catch (\Exception $e) {
            \Log::error('Erreur création produit: ' . $e->getMessage());
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function update(Request $request, Produit $produit)
    {
        try {
            $validated = $request->validate([
                'nom' => 'required|string|max:255',
                'description' => 'required|string',
                'prix' => 'required|numeric|min:0',
                'stock' => 'required|integer|min:0',
                'couleur' => 'required|string|max:50',
                'produitscategorie_id' => 'required|exists:produits_categories,id',
                'promo_id' => 'nullable|exists:promos,id',
                'image1' => 'nullable|image|max:2048',
                'image2' => 'nullable|image|max:2048',
                'image3' => 'nullable|image|max:2048',
                'image4' => 'nullable|image|max:2048',
            ]);

            $data = [
                'nom' => $validated['nom'],
                'description' => $validated['description'],
                'prix' => $validated['prix'],
                'stock' => $validated['stock'],
                'couleur' => $validated['couleur'],
                'produitscategorie_id' => $validated['produitscategorie_id'],
                'promo_id' => $validated['promo_id'] ?? null,
            ];

            // Gestion des images
            foreach (['image1', 'image2', 'image3', 'image4'] as $imageField) {
                if ($request->hasFile($imageField)) {
                    // Supprimer l'ancienne image si elle existe
                    if ($produit->$imageField) {
                        $oldPath = str_replace('storage/', '', $produit->$imageField);
                        if (Storage::disk('public')->exists($oldPath)) {
                            Storage::disk('public')->delete($oldPath);
                        }
                    }
                    $path = $request->file($imageField)->store('produits', 'public');
                    $data[$imageField] = "storage/$path";
                }
            }

            $produit->update($data);

            return redirect()->back()->with('success', 'Produit mis à jour !');
            
        } catch (\Exception $e) {
            \Log::error('Erreur mise à jour produit: ' . $e->getMessage());
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function destroy(Produit $produit)
    {
        try {
            // Supprimer toutes les images
            foreach (['image1', 'image2', 'image3', 'image4'] as $imageField) {
                if ($produit->$imageField) {
                    $path = str_replace('storage/', '', $produit->$imageField);
                    if (Storage::disk('public')->exists($path)) {
                        Storage::disk('public')->delete($path);
                    }
                }
            }

            $produit->delete();

            return redirect()->back()->with('success', 'Produit supprimé !');
            
        } catch (\Exception $e) {
            \Log::error('Erreur suppression produit: ' . $e->getMessage());
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }
}