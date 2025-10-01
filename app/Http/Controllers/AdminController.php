<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index(){
        $bannerImage = asset('storage/banner/offer_img.png');
        return Inertia::render('AdminHome',[
            'bannerImage' => $bannerImage,
        ]);
    }
}
