<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\BlogadminController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\CommandeController;
use App\Http\Controllers\ContactFormController;
use App\Http\Controllers\DetailsController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PanierController;
use App\Http\Controllers\ProduitadminController;
use App\Http\Controllers\ProduitController;
use App\Http\Controllers\ProduitsCategorieController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// === PUBLIC ===
Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/blog', [BlogController::class, 'index'])->name('blog');
Route::get('/blog/{id}', [BlogController::class, 'show'])->name('blog.show');
Route::post('/blog/{id}/comment', [BlogController::class, 'storeComment'])->name('blog.comment');

Route::get('/contact', [ContactFormController::class, 'index'])->name('contact');
Route::get('/details/{id}', [DetailsController::class, 'show'])->name('details.show');
Route::get('/produits', [ProduitController::class, 'index'])->name('produits');

// === USER AUTH ===
Route::middleware(['auth'])->group(function () {
    Route::get('/cart', [PanierController::class, 'index'])->name('cart');
    Route::post('/cart', [PanierController::class, 'store'])->name('cart.store');
    Route::put('/cart/{panier}', [PanierController::class, 'update'])->name('cart.update');
    Route::delete('/cart/{panier}', [PanierController::class, 'destroy'])->name('cart.destroy');
    Route::post('/checkout', [PanierController::class, 'checkout'])->name('cart.checkout');
    Route::get('/track', [PanierController::class, 'track'])->name('track');

    Route::get('/orders', [CommandeController::class, 'index'])->name('orders');
});

// === ADMIN GLOBAL (tous sauf user_id 1 et 2) ===
Route::middleware(['auth', 'exclude.roles'])->group(function () {
    Route::get('/admin', [AdminController::class, 'index'])->name('admin');

    // Catégories (Admin + Community Manager)
    Route::get('/admin/categories', [ProduitsCategorieController::class, 'index'])
        ->middleware('role:Admin,Community Manager')
        ->name('categories.index');

    Route::post('/admin/categories/produits', [ProduitsCategorieController::class, 'storeProduit'])
        ->middleware('role:Admin,Community Manager')
        ->name('categories.produits.store');

    Route::delete('/admin/categories/produits/{id}', [ProduitsCategorieController::class, 'destroyProduit'])
        ->middleware('role:Admin,Community Manager')
        ->name('categories.produits.destroy');

    Route::post('/admin/categories/blog', [ProduitsCategorieController::class, 'storeBlog'])
        ->middleware('role:Admin,Community Manager')
        ->name('categories.blog.store');

    Route::delete('/admin/categories/blog/{id}', [ProduitsCategorieController::class, 'destroyBlog'])
        ->middleware('role:Admin,Community Manager')
        ->name('categories.blog.destroy');

    Route::post('/admin/categories/tags', [ProduitsCategorieController::class, 'storeTag'])
        ->middleware('role:Admin,Community Manager')
        ->name('categories.tags.store');

    Route::delete('/admin/categories/tags/{id}', [ProduitsCategorieController::class, 'destroyTag'])
        ->middleware('role:Admin,Community Manager')
        ->name('categories.tags.destroy');

    // Users (Admin only)
    Route::get('/admin/users', [RoleController::class, 'index'])->middleware('role:Admin')->name('users.index');
    Route::post('/admin/users', [RoleController::class, 'store'])->middleware('role:Admin')->name('users.store');
    Route::put('/admin/users/{id}', [RoleController::class, 'update'])->middleware('role:Admin')->name('users.update');
    Route::delete('/admin/users/{id}', [RoleController::class, 'destroy'])->middleware('role:Admin')->name('users.destroy');

    // Produits (Webmaster + Admin)
    Route::middleware('role:Webmaster,Admin')->group(function () {
        Route::get('/admin/produits', [ProduitadminController::class, 'index'])->name('produits.index');
        Route::post('/admin/produits', [ProduitadminController::class, 'store'])->name('produits.store');
        Route::put('/admin/produits/{produit}', [ProduitadminController::class, 'update'])->name('produits.update');
        Route::delete('/admin/produits/{produit}', [ProduitadminController::class, 'destroy'])->name('produits.destroy');
    });

    // Blogs (Community Manager + Admin)
    Route::middleware('role:Community Manager,Admin')->group(function () {
        Route::get('/admin/blogs', [BlogadminController::class, 'index'])->name('blogs.index');
        Route::post('/admin/blogs', [BlogadminController::class, 'store'])->name('blogs.store');
        Route::put('/admin/blogs/{blog}', [BlogadminController::class, 'update'])->name('blogs.update');
        Route::delete('/admin/blogs/{blog}', [BlogadminController::class, 'destroy'])->name('blogs.destroy');
    });

    // Orders (Agent + Admin)
    Route::middleware('role:Agent,Admin')->group(function () {
        Route::get('/admin/orders', [OrderController::class, 'index'])->name('orders.admin');
        Route::put('/admin/orders/{commande}/confirm', [OrderController::class, 'updateStatus'])->name('orders.confirm');
    });
});

// === PROFILE + DASHBOARD ===
Route::get('/dashboard', fn() => Inertia::render('Dashboard'))
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';