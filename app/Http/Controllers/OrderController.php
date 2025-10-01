<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        $bannerImage = asset('storage/banner/offer_img.png');

        return Inertia::render('OrderAdmin', [
            'bannerImage' => $bannerImage,
        ]);
    }
}
