<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message; 
use App\Mail\ReplyMail;                   
use Illuminate\Support\Facades\Mail;     
use Inertia\Inertia; 

class ContactController extends Controller
{
    public function send(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string',
        ]);

        Message::create($validated);

        return back()->with('success', 'Votre message a été envoyé avec succès ✅');
    }

    // Affichage côté admin
    public function index()
    {
        $messages = Message::latest()->get();
        return Inertia::render('Mailbox', [
            'messages' => $messages
        ]);
    }

    // Répondre à un message
    public function reply(Request $request, $id)
    {
        $message = Message::findOrFail($id);

        $request->validate([
            'reply' => 'required|string',
        ]);

        Mail::to($message->email)->send(new ReplyMail($message->name, $request->reply));

        $message->update(['replied' => true]);

        return back()->with('success', 'Réponse envoyée avec succès !');
    }
}
