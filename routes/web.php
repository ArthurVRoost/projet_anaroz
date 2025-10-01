<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\CommandeController;
use App\Http\Controllers\ContactFormController;
use App\Http\Controllers\DetailsController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PanierController;
use App\Http\Controllers\ProduitController;
use App\Http\Controllers\ProduitsCategorieController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/blog', [BlogController::class, 'index'])->name('blog');
Route::get('/blog/{id}', [BlogController::class, 'show'])->name('blog.show');
Route::post('/blog/{id}/comment', [BlogController::class, 'storeComment'])->name('blog.comment');

Route::get('/contact', [ContactFormController::class, 'index'])->name('blog');

Route::get('/details/{id}', [DetailsController::class, 'show'])->name('details.show');

Route::get('/produits', [ProduitController::class, 'index'])->name('produits');

Route::middleware(['auth'])->group(function () {
    Route::get('/cart', [PanierController::class, 'index'])->name('cart');
    Route::post('/cart', [PanierController::class, 'store'])->name('cart.store');
    Route::put('/cart/{panier}', [PanierController::class, 'update'])->name('cart.update');
    Route::delete('/cart/{panier}', [PanierController::class, 'destroy'])->name('cart.destroy');
    Route::post('/checkout', [PanierController::class, 'checkout'])->name('cart.checkout');

    Route::get('/track', [PanierController::class, 'track'])->name('track');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/orders', [CommandeController::class, 'index'])->name('orders');
});

// ADMIN
Route::get('/admin', [AdminController::class, 'index'])->name('admin');

// Affichage des deux types de catégories
Route::get('/admin/categories', [ProduitsCategorieController::class, 'index'])->name('categories.index');

// CRUD Produits
Route::post('/admin/categories/produits', [ProduitsCategorieController::class, 'storeProduit'])->name('categories.produits.store');
Route::delete('/admin/categories/produits/{id}', [ProduitsCategorieController::class, 'destroyProduit'])->name('categories.produits.destroy');

// CRUD Blog
Route::post('/admin/categories/blog', [ProduitsCategorieController::class, 'storeBlog'])->name('categories.blog.store');
Route::delete('/admin/categories/blog/{id}', [ProduitsCategorieController::class, 'destroyBlog'])->name('categories.blog.destroy');

// Tags CRUD
Route::post('/admin/categories/tags', [ProduitsCategorieController::class, 'storeTag'])->name('categories.tags.store');
Route::delete('/admin/categories/tags/{id}', [ProduitsCategorieController::class, 'destroyTag'])->name('categories.tags.destroy');

// USERS CRUD
Route::get('/admin/users', [RoleController::class, 'index'])->name('users.index');
Route::post('/admin/users', [RoleController::class, 'store'])->name('users.store');
Route::put('/admin/users/{id}', [RoleController::class, 'update'])->name('users.update');
Route::delete('/admin/users/{id}', [RoleController::class, 'destroy'])->name('users.destroy');







Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
