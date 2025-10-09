<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class NewsletterWelcomeMail extends Mailable
{
    use Queueable, SerializesModels;

    public function build()
    {
        return $this->subject('Merci pour ton inscription à la newsletter')
                    ->view('emails.newsletter_welcome');
    }
}