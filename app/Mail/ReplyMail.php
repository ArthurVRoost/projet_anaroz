<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ReplyMail extends Mailable
{
    use Queueable, SerializesModels;

    public $name;
    public $reply;

    /**
     * Crée une nouvelle instance du mail
     */
    public function __construct($name, $reply)
    {
        $this->name = $name;
        $this->reply = $reply;
    }

    /**
     * Construit le mail à envoyer
     */
    public function build()
    {
        return $this->subject('Réponse à votre message')
                    ->view('emails.reply');
    }
}