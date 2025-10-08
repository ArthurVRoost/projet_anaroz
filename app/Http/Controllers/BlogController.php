<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\BlogCategorie;
use App\Models\Commentaire;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BlogController extends Controller
{
    // AFFICHE LA PAGE PRINCIPALE DES BLOGS
    public function index(Request $request){
        $bannerImage = asset('storage/banner/feature_1.png');
        $query = Blog::with(['categorie', 'tags']);

        // FILTRE DE RECHERCHE PAR TITRE OU DESCRIPTION
        if ($request->has('search') && $request->search != '') {
            $query->where('titre', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
        }

        // FILTRE PAR CATEGORIE
        if ($request->has('categorie') && $request->categorie != '') {
            $query->whereHas('categorie', function ($q) use ($request) {
                $q->where('nom', $request->categorie);
            });
        }

        // FILTRE PAR TAG
        if ($request->has('tag') && $request->tag != '') {
            $query->whereHas('tags', function ($q) use ($request) {
                $q->where('nom', $request->tag);
            });
        }

        // RECUPERE LES BLOGS FILTRES
        $blogs = $query->get();

        // RECUPERE LES CATEGORIES AVEC LEUR NOMBRE DE BLOGS
        $categories = BlogCategorie::withCount('blogs')->get();
        // COMME CAT
        $tags = Tag::withCount('blogs')->get();
        return Inertia::render('Blog', [
            'bannerImage' => $bannerImage,
            'blogs' => $blogs,
            'categories' => $categories,
            'tags' => $tags,
            'filters' => $request->only(['search', 'categorie', 'tag']),
        ]);
    }
    public function show($id){
        $bannerImage = asset('storage/banner/feature_1.png');

        // RECUPERE LE BLOG AVEC SA CATEGORIE SES TAGS ET SES COMMENTAIRES
        $blog = Blog::with(['categorie', 'tags', 'commentaires.user'])->findOrFail($id);

        // RECUPERE TOUTES LES CATEGORIES AVEC NOMBRE DE BLOGS
        $categories = BlogCategorie::withCount('blogs')->get();
        $tags = Tag::withCount('blogs')->get();

        // RECUPERE LES 3 DERNIERS BLOGS POUR LA SECTION "RECENT POSTS"
        $recentPosts = Blog::latest()->take(3)->get();

        return Inertia::render('BlogDetails', [
            'bannerImage' => $bannerImage,
            'blog' => $blog,
            'categories' => $categories,
            'tags' => $tags,
            'recentPosts' => $recentPosts,
        ]);
    }

    public function storeComment(Request $request, $id){
        // VERIFIE SI L UTILISATEUR EST CONNECTE
        if (!auth()->check()) {
            return redirect()->route('login')->with('error', 'Vous devez etre connecte pour commenter.');
        }

        // VALIDE LE MESSAGE DU COMMENTAIRE
        $request->validate([
            'message' => 'required|string|max:500',
        ]);

        // CREE LE COMMENTAIRE AVEC L UTILISATEUR CONNECTE
        Commentaire::create([
            'message' => $request->message,
            'user_id' => Auth::id(),
            'blog_id' => $id,
        ]);
        return Inertia::location(route('blog.show', $id));
    }
}