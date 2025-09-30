<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\DetailsController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PanierController;
use App\Http\Controllers\ProduitController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/blog', [BlogController::class, 'index'])->name('blog');
Route::get('/blog/{id}', [BlogController::class, 'show'])->name('blog.show');
Route::post('/blog/{id}/comment', [BlogController::class, 'storeComment'])->name('blog.comment');

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

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
