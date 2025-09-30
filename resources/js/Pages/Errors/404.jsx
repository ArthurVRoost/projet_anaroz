import "../../..//css/errors.css"

export default function NotFound() {
  return (
    <div className="error-page">
      <h1>404</h1>
      <p>Oups... La page que vous cherchez n'existe pas.</p>
      <a href="/" className="error-link">Retour à l'accueil</a>
    </div>
  )
}