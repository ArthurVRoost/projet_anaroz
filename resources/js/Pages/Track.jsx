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
        <h2 style={{color:'#f72585', fontWeight:'bold', fontSize:'30px'}}>Suivi de commande</h2>
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
    {/* Bloc Infos Commande */}
    <div className="commande-card">
      <h3>Order Info</h3>
      <p><strong>Order Number:</strong> {commande.numRandom}</p>
      <p><strong>Total:</strong> {commande.prix} €</p>
      <p><strong>Status:</strong> {commande.status}</p>
      <p><strong>Payment Method:</strong> {commande.payment_method}</p>
    </div>

    {/* Bloc Adresse de livraison */}
    <div className="commande-card">
  <h3>Billing Address</h3>
  {commande.billing_address ? (
    <>
      <p><strong>Nom:</strong> {commande.billing_address.name}</p>
      <p><strong>Rue:</strong> {commande.billing_address.street}</p>
      <p><strong>Ville:</strong> {commande.billing_address.city}</p>
      <p><strong>Code postal:</strong> {commande.billing_address.postal}</p>
      <p><strong>Pays:</strong> {commande.billing_address.country}</p>
    </>
  ) : (
    <p>Pas d'adresse enregistrée</p>
  )}
</div>

    {/* Bloc Produits */}
    <div className="commande-card" style={{ gridColumn: '1 / span 2' }}>
      <h3>Produits</h3>
      <ul>
        {commande.produits.map((p) => (
          <li key={p.id}>
            {p.nom} x {p.pivot.quantite} → {p.pivot.prix} €
          </li>
        ))}
      </ul>
    </div>
  </div>
)}
      </div>
      <Footer />
    </div>
  )
}