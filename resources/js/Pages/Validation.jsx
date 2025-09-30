import { usePage, Link } from '@inertiajs/react'
import '../../css/cart.css'
import Nav from '@/Components/Nav'
import Footer from '@/Components/Footer'

export default function Validation() {
  const { commande } = usePage().props

  return (
    <div>
      <Nav />
      <div className="validation-container">
        <h2>Merci pour votre commande 🎉</h2>
        <p>Votre numéro de commande est : <strong>{commande.numRandom}</strong></p>
        <p>Montant payé : <strong>{commande.prix} €</strong></p>
        <p>Status : {commande.status}</p>
        <Link href={route('track')}>Suivre ma commande</Link>
      </div>
      <Footer />
    </div>
  )
}