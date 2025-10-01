<?php

namespace App\Http\Controllers;

use App\Models\BlogCategorie;
use App\Models\ProduitsCategorie;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProduitsCategorieController extends Controller
{
    public function index()
    {
        $bannerImage = asset('storage/banner/offer_img.png');

        return Inertia::render('Categories', [
            'bannerImage' => $bannerImage,
            'produitsCategories' => ProduitsCategorie::all(),
            'blogCategories' => BlogCategorie::all(),
            'tags' => Tag::all(),
        ]);
    }

    // ---- Produits ----
    public function storeProduit(Request $request)
{
    $request->validate(['nom' => 'required|string|max:255']);
    ProduitsCategorie::create(['nom' => $request->nom]);
    return back(); // ⬅️ garde l'état et recharge les props
}

    public function destroyProduit($id)
    {
        ProduitsCategorie::findOrFail($id)->delete();
        return redirect()->back();
    }

    // ---- Blog ----
    public function storeBlog(Request $request)
{
    $request->validate(['nom' => 'required|string|max:255']);
    BlogCategorie::create(['nom' => $request->nom]);
    return back();
}

    public function destroyBlog($id)
    {
        BlogCategorie::findOrFail($id)->delete();
        return redirect()->back();
    }

    public function storeTag(Request $request)
    {
        $request->validate(['nom' => 'required|string|max:255']);
        Tag::create(['nom' => $request->nom]);
        return back();
    }

    public function destroyTag($id)
    {
        Tag::findOrFail($id)->delete();
        return back();
    }
}
