import "../../..//css/errors.css"

export default function Forbidden() {
  return (
    <div className="error-page">
      <h1>403</h1>
      <p>Accès refusé. Vous n'avez pas la permission de voir cette page.</p>
      <a href="/" className="error-link">Retour à l'accueil</a>
    </div>
  )
}