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
    
    public function index(){

        $bannerImage = asset('storage/banner/offer_img.png');
        $produits = Produit::with(['categorie', 'user', 'promo'])->latest()->get();
        $categories = ProduitsCategorie::all();
        $promos = Promo::all();
        $imageBaseUrl = asset('storage');

        // AJOUTE UN CHAMP IMAGE_URL POUR CHAQUE PRODUIT
        $produits->transform(function ($p) use ($imageBaseUrl) {
            // SI PAS D IMAGE, AFFICHE UNE IMAGE PAR DEFAUT
            if (!$p->image1) {
                $p->image_url = $imageBaseUrl . '/default.png';
            }
            // SI L IMAGE EST DEJA DANS STORAGE/
            elseif (str_starts_with($p->image1, 'storage/')) {
                $p->image_url = asset($p->image1);
            }
            // SI L IMAGE COMMENCE PAR FEATURE_
            elseif (str_starts_with($p->image1, 'feature_')) {
                $p->image_url = $imageBaseUrl . '/feature/large/' . $p->image1;
            }
            // SI L IMAGE COMMENCE PAR PRODUCT_
            elseif (str_starts_with($p->image1, 'product_')) {
                $p->image_url = $imageBaseUrl . '/product/' . $p->image1;
            }
            // SI L IMAGE COMMENCE PAR BANNER_
            elseif (str_starts_with($p->image1, 'banner_')) {
                $p->image_url = $imageBaseUrl . '/banner/' . $p->image1;
            }
            // SINON, ON AJOUTE LE CHEMIN DE BASE PAR DEFAUT
            else {
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

    
    public function store(Request $request){
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
            $path1 = $request->file('image1')->store('produits', 'public');
            $images['image1'] = "storage/$path1";

            foreach (['image2', 'image3', 'image4'] as $imageField) {
                if ($request->hasFile($imageField)) {
                    $path = $request->file($imageField)->store('produits', 'public');
                    $images[$imageField] = "storage/$path";
                } else {
                    $images[$imageField] = null;
                }
            }

            // LOG DES DONNEES POUR DEBUG
            \Log::info('DONNEES ENVOYEES:', $validated + [
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

            return redirect()->back()->with('success', 'Produit cree avec succes !');
            
        } catch (\Exception $e) {
            // EN CAS D ERREUR, LOG ET MESSAGE D ERREUR
            \Log::error('ERREUR CREATION PRODUIT: ' . $e->getMessage());
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function update(Request $request, Produit $produit){
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

            // GERE LA MISE A JOUR DES IMAGES
            foreach (['image1', 'image2', 'image3', 'image4'] as $imageField) {
                if ($request->hasFile($imageField)) {
                    // SUPPRIME L ANCIENNE IMAGE SI ELLE EXISTE
                    if ($produit->$imageField) {
                        $oldPath = str_replace('storage/', '', $produit->$imageField);
                        if (Storage::disk('public')->exists($oldPath)) {
                            Storage::disk('public')->delete($oldPath);
                        }
                    }
                    // AJOUTE LA NOUVELLE IMAGE
                    $path = $request->file($imageField)->store('produits', 'public');
                    $data[$imageField] = "storage/$path";
                }
            }

            // MET A JOUR LE PRODUIT DANS LA BASE
            $produit->update($data);

            return redirect()->back()->with('success', 'Produit mis a jour !');
            
        } catch (\Exception $e) {
            // LOG ET MESSAGE D ERREUR
            \Log::error('ERREUR MISE A JOUR PRODUIT: ' . $e->getMessage());
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    
    public function destroy(Produit $produit){
        try {
            // SUPPRIME CHAQUE IMAGE DU PRODUIT SI ELLE EXISTE
            foreach (['image1', 'image2', 'image3', 'image4'] as $imageField) {
                if ($produit->$imageField) {
                    $path = str_replace('storage/', '', $produit->$imageField);
                    if (Storage::disk('public')->exists($path)) {
                        Storage::disk('public')->delete($path);
                    }
                }
            }

            // SUPPRIME LE PRODUIT DE LA BASE
            $produit->delete();
            return redirect()->back()->with('success', 'Produit supprime !');
            
        } catch (\Exception $e) {
            // LOG ET MESSAGE D ERREUR
            \Log::error('ERREUR SUPPRESSION PRODUIT: ' . $e->getMessage());
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }
}