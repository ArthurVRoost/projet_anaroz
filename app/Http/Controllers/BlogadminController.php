<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogadminController extends Controller
{
    public function index(){
        $bannerImage = asset('storage/banner/offer_img.png'); 

        return Inertia::render('BlogAdmin', [
            'bannerImage' => $bannerImage,
            
        ]);
    }
}
