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
    public function index(Request $request){
    $bannerImage = asset('storage/banner/feature_1.png');

    // Base query
    $query = Blog::with(['categorie', 'tags']);

    // Search
    if ($request->has('search') && $request->search != '') {
        $query->where('titre', 'like', '%' . $request->search . '%')
              ->orWhere('description', 'like', '%' . $request->search . '%');
    }

    // Filtre par catégorie
    if ($request->has('categorie') && $request->categorie != '') {
        $query->whereHas('categorie', function ($q) use ($request) {
            $q->where('nom', $request->categorie);
        });
    }

    // Filtre par tag
    if ($request->has('tag') && $request->tag != '') {
        $query->whereHas('tags', function ($q) use ($request) {
            $q->where('nom', $request->tag);
        });
    }

    $blogs = $query->get();

    // Catégories avec compteur
    $categories = BlogCategorie::withCount('blogs')->get();

    // Tags (optionnel : avec count aussi)
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

            $blog = Blog::with(['categorie', 'tags', 'commentaires.user'])->findOrFail($id);

            $categories = BlogCategorie::withCount('blogs')->get();
            $tags = Tag::withCount('blogs')->get();
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
        if (!auth()->check()) {
            return redirect()->route('login')->with('error', 'Vous devez être connecté pour commenter.');
        }
        $request->validate([
            'message' => 'required|string|max:500',
        ]);

        // Si tu veux forcer que seul un user connecté commente
        // $userId = Auth::id();

        Commentaire::create([
            'message' => $request->message,
            'user_id' => Auth::id(), // test user pour l'instant
            'blog_id' => $id,
        ]);

        return Inertia::location(route('blog.show', $id));
    }
}
