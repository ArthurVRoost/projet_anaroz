<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\BlogCategorie;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class BlogadminController extends Controller
{
    public function index()
    {
        $bannerImage = asset('storage/banner/offer_img.png');
        $blogs = Blog::with(['categorie', 'user'])->latest()->get();
        $categories = BlogCategorie::all();

        return Inertia::render('BlogAdmin', [
            'bannerImage' => $bannerImage,
            'blogs' => $blogs,
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'titre' => 'required|string|max:255',
                'description' => 'required|string',
                'blogcategorie_id' => 'required|exists:blog_categories,id',
                'blog_path' => 'nullable|image|max:2048'
            ]);

            $path = null;
            if ($request->hasFile('blog_path')) {
                $path = $request->file('blog_path')->store('blog', 'public');
            }

            Blog::create([
                'titre' => $validated['titre'],
                'description' => $validated['description'],
                'blogcategorie_id' => $validated['blogcategorie_id'],
                'user_id' => auth()->id(),
                'blog_path' => $path ? "storage/$path" : null,
            ]);

            return redirect()->back()->with('success', 'Blog créé avec succès !');
            
        } catch (\Exception $e) {
            \Log::error('Erreur création blog: ' . $e->getMessage());
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function update(Request $request, Blog $blog)
    {
        try {
            $validated = $request->validate([
                'titre' => 'required|string|max:255',
                'description' => 'required|string',
                'blogcategorie_id' => 'required|exists:blog_categories,id',
                'blog_path' => 'nullable|image|max:2048'
            ]);

            $data = [
                'titre' => $validated['titre'],
                'description' => $validated['description'],
                'blogcategorie_id' => $validated['blogcategorie_id'],
            ];

            if ($request->hasFile('blog_path')) {
                // Supprimer l'ancienne image
                if ($blog->blog_path) {
                    $oldPath = str_replace('storage/', '', $blog->blog_path);
                    if (Storage::disk('public')->exists($oldPath)) {
                        Storage::disk('public')->delete($oldPath);
                    }
                }
                $path = $request->file('blog_path')->store('blog', 'public');
                $data['blog_path'] = "storage/$path";
            }

            $blog->update($data);

            return redirect()->back()->with('success', 'Blog mis à jour !');
            
        } catch (\Exception $e) {
            \Log::error('Erreur mise à jour blog: ' . $e->getMessage());
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function destroy(Blog $blog)
    {
        try {
            if ($blog->blog_path) {
                $path = str_replace('storage/', '', $blog->blog_path);
                if (Storage::disk('public')->exists($path)) {
                    Storage::disk('public')->delete($path);
                }
            }

            $blog->delete();

            return redirect()->back()->with('success', 'Blog supprimé !');
            
        } catch (\Exception $e) {
            \Log::error('Erreur suppression blog: ' . $e->getMessage());
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }
}