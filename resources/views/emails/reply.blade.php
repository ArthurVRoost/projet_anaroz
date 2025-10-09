<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Réponse à votre message</title>
</head>
<body>
  <p>Bonjour {{ $name }},</p>
  <p>{{ $reply }}</p>
  <br>
  <p>Cordialement,<br>L’équipe {{ config('app.name') }}</p>
</body>
</html>