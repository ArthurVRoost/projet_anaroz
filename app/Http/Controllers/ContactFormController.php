<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactFormController extends Controller
{
    public function index(){
        $bannerImage = asset('storage/banner/feature_1.png');

        return Inertia::render('Contact',[
            'bannerImage' => $bannerImage,
        ]);
    }
}
