<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\BlogCategorie;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class BlogadminController extends Controller
{
    // AFFICHE LA PAGE ADMIN DES BLOGS
    public function index(){

        $bannerImage = asset('storage/banner/offer_img.png');
        $blogs = Blog::with(['categorie', 'user'])->latest()->get();
        $categories = BlogCategorie::all();

        return Inertia::render('BlogAdmin', [
            'bannerImage' => $bannerImage,
            'blogs' => $blogs,
            'categories' => $categories,
        ]);
    }

    // CREE UN NOUVEAU BLOG
    public function store(Request $request)
    {
        try {
            // VALIDE LES DONNEES DU FORMULAIRE
            $validated = $request->validate([
                'titre' => 'required|string|max:255',
                'description' => 'required|string',
                'blogcategorie_id' => 'required|exists:blog_categories,id',
                'blog_path' => 'nullable|image|max:2048'
            ]);

            // INITIALISE LE CHEMIN D IMAGE A NULL
            $path = null;

            // SI UNE IMAGE EST ENVOYEE, LA STOCKER DANS STORAGE/BLOG
            if ($request->hasFile('blog_path')) {
                $path = $request->file('blog_path')->store('blog', 'public');
            }

            // CREE LE NOUVEAU BLOG AVEC LES DONNEES VALIDEES
            Blog::create([
                'titre' => $validated['titre'],
                'description' => $validated['description'],
                'blogcategorie_id' => $validated['blogcategorie_id'],
                'user_id' => auth()->id(),
                'blog_path' => $path ? "storage/$path" : null,
            ]);

            
            return redirect()->back()->with('success', 'Blog cree avec succes !');
            
        } catch (\Exception $e) {
            // LOG L ERREUR ET RENVOIE UN MESSAGE D ERREUR
            \Log::error('ERREUR CREATION BLOG: ' . $e->getMessage());
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    // MET A JOUR UN BLOG EXISTANT
    public function update(Request $request, Blog $blog)
    {
        try {
            // VALIDE LES DONNEES DU FORMULAIRE
            $validated = $request->validate([
                'titre' => 'required|string|max:255',
                'description' => 'required|string',
                'blogcategorie_id' => 'required|exists:blog_categories,id',
                'blog_path' => 'nullable|image|max:2048'
            ]);

            // PREPARE LES DONNEES A METTRE A JOUR
            $data = [
                'titre' => $validated['titre'],
                'description' => $validated['description'],
                'blogcategorie_id' => $validated['blogcategorie_id'],
            ];

            // SI UNE NOUVELLE IMAGE EST ENVOYEE
            if ($request->hasFile('blog_path')) {
                // SUPPRIME L ANCIENNE IMAGE SI ELLE EXISTE
                if ($blog->blog_path) {
                    $oldPath = str_replace('storage/', '', $blog->blog_path);
                    if (Storage::disk('public')->exists($oldPath)) {
                        Storage::disk('public')->delete($oldPath);
                    }
                }
                // STOCKE LA NOUVELLE IMAGE ET MET A JOUR LE CHEMIN
                $path = $request->file('blog_path')->store('blog', 'public');
                $data['blog_path'] = "storage/$path";
            }

            // MET A JOUR LE BLOG DANS LA BASE
            $blog->update($data);

            // REDIRIGE AVEC UN MESSAGE DE SUCCES
            return redirect()->back()->with('success', 'Blog mis a jour !');
            
        } catch (\Exception $e) {
            // LOG L ERREUR ET RENVOIE UN MESSAGE D ERREUR
            \Log::error('ERREUR MISE A JOUR BLOG: ' . $e->getMessage());
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    // SUPPRIME UN BLOG
    public function destroy(Blog $blog)
    {
        try {
            // SUPPRIME L IMAGE ASSOCIEE SI ELLE EXISTE
            if ($blog->blog_path) {
                $path = str_replace('storage/', '', $blog->blog_path);
                if (Storage::disk('public')->exists($path)) {
                    Storage::disk('public')->delete($path);
                }
            }

            // SUPPRIME LE BLOG DE LA BASE
            $blog->delete();

            return redirect()->back()->with('success', 'Blog supprime !');
            
        } catch (\Exception $e) {
            // LOG L ERREUR ET RENVOIE UN MESSAGE D ERREUR
            \Log::error('ERREUR SUPPRESSION BLOG: ' . $e->getMessage());
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }
}