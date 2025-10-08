import { useState } from 'react'
import { usePage, router } from '@inertiajs/react'
import '../../css/cart.css'
import Nav from '@/Components/Nav'
import Footer from '@/Components/Footer'

export default function Panier() {
  const { paniers } = usePage().props

  
  const [name, setName] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [postal, setPostal] = useState('')
  const [country, setCountry] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('bancontact')

  const handleUpdate = (id, quantite) => {
    router.put(route('cart.update', id), { quantite })
  }

  const handleDelete = (id) => {
    router.delete(route('cart.destroy', id))
  }

  const total = paniers.reduce(
    (acc, p) => acc + ((p.produit.promo_prix ?? p.produit.prix) * p.quantite),
    0
  )

  const handleCheckout = (e) => {
    e.preventDefault()
    router.post(route('cart.checkout'), {
      billing_address: {
        name,
        street,
        city,
        postal,
        country,
      },
      payment_method: paymentMethod,
    })
  }

  return (
    <div>
      <Nav />
      <div className="cart-container">
        <h2>Votre Panier</h2>

        {paniers.length > 0 ? (
          <>
            
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Produit</th>
                  <th>Prix</th>
                  <th>Quantité</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {paniers.map((item) => {
                  const prix = Number(item.produit.promo_prix ?? item.produit.prix)
                  return (
                    <tr key={item.id}>
                      <td>{item.produit.nom}</td>
                      <td>{prix.toFixed(2)} €</td>
                      <td>
                        <input
                          type="number"
                          min="1"
                          value={item.quantite}
                          onChange={(e) =>
                            handleUpdate(item.id, e.target.value)
                          }
                        />
                      </td>
                      <td>{(prix * item.quantite).toFixed(2)} €</td>
                      <td>
                        <button
                          className="btn-remove"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>

           
            <div className="checkout-form">
              <h3>Adresse de livraison</h3>
              <form onSubmit={handleCheckout}>
                <input
                  type="text"
                  placeholder="Nom complet"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Rue"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Ville"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Code postal"
                  value={postal}
                  onChange={(e) => setPostal(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Pays"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                />

                <h3>Méthode de paiement</h3>
                    <div className="payment-options">
                        <label>
                            <input
                            type="radio"
                            name="payment"
                            value="bancontact"
                            checked={paymentMethod === 'bancontact'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <span>Bancontact</span>
                        </label>
                        <label>
                            <input
                            type="radio"
                            name="payment"
                            value="paypal"
                            checked={paymentMethod === 'paypal'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <span>PayPal</span>
                        </label>
                        </div>

                <div className="cart-summary">
                  <h3>Total: {total.toFixed(2)} €</h3>
                  <button type="submit" className="btn-pay">
                    Payer
                  </button>
                </div>
              </form>
            </div>
          </>
        ) : (
          <p>Votre panier est vide</p>
        )}
      </div>
      <Footer />
    </div>
  )
}