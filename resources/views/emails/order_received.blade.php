<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Merci pour votre commande</title>
</head>
<body style="font-family: Arial, sans-serif;">
  <h2>Bonjour {{ $commande->user->name }},</h2>

  <p>Merci d’avoir commandé chez nous!</p>
  <p>Nous avons bien reçu ta commande n° <strong>{{ $commande->numRandom }}</strong>.</p>

  <p>
    Montant total : <strong>{{ number_format($commande->prix, 2, ',', ' ') }} €</strong><br>
    Statut : <strong>{{ ucfirst($commande->status) }}</strong>
  </p>

  <p>
    Nous allons te renvoyer un email dès que ta commande sera validée par notre équipe.  
    <br><br>
    Merci pour ta confiance 
  </p>

  <p>Cordialement,<br>L’équipe {{ config('app.name') }}</p>
</body>
</html>