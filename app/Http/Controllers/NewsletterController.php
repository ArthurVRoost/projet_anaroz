<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\NewsletterWelcomeMail;

class NewsletterController extends Controller
{
    public function subscribe(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
        ]);

        // Envoi du mail de remerciement
        Mail::to($validated['email'])->send(new NewsletterWelcomeMail());

        return back()->with('success', 'Merci pour ton inscription à la newsletter ✅');
    }
}
