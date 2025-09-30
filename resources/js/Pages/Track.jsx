import { useState } from 'react'
import { usePage, router } from '@inertiajs/react'
import '../../css/track.css'
import Nav from '@/Components/Nav'
import Footer from '@/Components/Footer'

export default function Track() {
  const { commande, error } = usePage().props
  const [numRandom, setNumRandom] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    router.get(route('track'), { numRandom })
  }

  return (
    <div>
      <Nav />
      <div className="track-container">
        <h2>Suivi de commande</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Entrez votre numéro de commande"
            value={numRandom}
            onChange={(e) => setNumRandom(e.target.value)}
          />
          <button type="submit">Suivre</button>
        </form>

        {error && <p className="error">{error}</p>}

        {commande && (
          <div className="commande-details">
            <h3>Commande #{commande.numRandom}</h3>
            <p>Total : {commande.prix} €</p>
            <p>Status : {commande.status}</p>
            <p>
              <strong>Adresse de livraison :</strong><br />
              {commande.billing_address?.name}<br />
              {commande.billing_address?.street}<br />
              {commande.billing_address?.city}, {commande.billing_address?.postal}
            </p>
            <p><strong>Méthode de paiement :</strong> {commande.payment_method}</p>
            <h4>Articles :</h4>
            <ul>
              {commande.produits.map((p) => (
                <li key={p.id}>
                  {p.nom} x {p.pivot.quantite} → {p.pivot.prix} €
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}