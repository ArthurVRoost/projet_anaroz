<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\Commande;

class OrderConfirmedMail extends Mailable
{
    use Queueable, SerializesModels;

    public $commande;

    public function __construct(Commande $commande)
    {
        $this->commande = $commande;
    }

    public function build()
    {
        return $this->subject('Votre commande a été validée')
                    ->view('emails.order_confirmed');
    }
}