<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Commande validée</title>
</head>
<body style="font-family: Arial, sans-serif;">
  <h2>Bonjour {{ $commande->user->name }},</h2>

  <p>
    Nous avons le plaisir de vous informer que votre commande n° 
    <strong>{{ $commande->numRandom }}</strong> a été validée avec succès. 🎉
  </p>

  <p>
    Montant total : <strong>{{ number_format($commande->prix, 2, ',', ' ') }} €</strong>
  </p>

  <p>
    Merci pour votre confiance et votre commande sur <strong>{{ config('app.name') }}</strong> !
  </p>

  <p>Cordialement,<br>L’équipe {{ config('app.name') }}</p>
</body>
</html>