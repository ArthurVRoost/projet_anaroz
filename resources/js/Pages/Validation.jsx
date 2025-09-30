import { usePage, Link } from '@inertiajs/react'
import '../../css/validation.css'
import Nav from '@/Components/Nav'
import Footer from '@/Components/Footer'

export default function Validation() {
  const { commande } = usePage().props

  return (
    <div>
      <Nav />
      <div className="validation-container">
        <div className="validation-card">
          <h2 className="validation-title">Merci pour votre commande</h2>
          <p className="validation-text">
            Votre numéro de commande est : <strong>{commande.numRandom}</strong>
          </p>
          <p className="validation-text">
            Montant payé : <strong>{Number(commande.prix).toFixed(2)} €</strong>
          </p>
          <p className="validation-status">
            Statut : <span className={`status-badge ${commande.status}`}>{commande.status}</span>
          </p>
          <Link href={route('track')} className="track-link">
            Suivre ma commande
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}