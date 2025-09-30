import "../../../css/errors.css"

export default function ServerError() {
  return (
    <div className="error-page">
      <h1>500</h1>
      <p>Oups... Une erreur interne est survenue.</p>
      <a href="/" className="error-link">Retour à l'accueil</a>
    </div>
  )
}