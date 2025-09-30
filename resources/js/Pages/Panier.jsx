import { useState } from 'react'
import { usePage, router } from '@inertiajs/react'
import '../../css/cart.css'
import Nav from '@/Components/Nav'
import Footer from '@/Components/Footer'

export default function Panier() {
  const { paniers } = usePage().props
  const [billingAddress, setBillingAddress] = useState({
    name: '',
    street: '',
    city: '',
    postal: ''
  })
  const [paymentMethod, setPaymentMethod] = useState('paypal')

  const handleUpdate = (id, quantite) => {
    router.put(route('cart.update', id), { quantite })
  }

  const handleDelete = (id) => {
    router.delete(route('cart.destroy', id))
  }

  const handleCheckout = (e) => {
    e.preventDefault()
    router.post(route('cart.checkout'), {
      billing_address: billingAddress,
      payment_method: paymentMethod
    })
  }

  const total = paniers.reduce(
    (acc, p) => acc + ((p.produit.promo_prix ?? p.produit.prix) * p.quantite),
    0
  )

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
                          ❌
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>

            {/* Adresse de livraison */}
            <div className="checkout-form">
              <h3>Adresse de livraison</h3>
              <input
                type="text"
                placeholder="Nom complet"
                value={billingAddress.name}
                onChange={(e) =>
                  setBillingAddress({ ...billingAddress, name: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Rue et numéro"
                value={billingAddress.street}
                onChange={(e) =>
                  setBillingAddress({ ...billingAddress, street: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Ville"
                value={billingAddress.city}
                onChange={(e) =>
                  setBillingAddress({ ...billingAddress, city: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Code postal"
                value={billingAddress.postal}
                onChange={(e) =>
                  setBillingAddress({ ...billingAddress, postal: e.target.value })
                }
              />

              {/* Choix paiement */}
              <h3>Méthode de paiement</h3>
              <div className="payment-options">
                <label>
                  <input
                    type="radio"
                    value="paypal"
                    checked={paymentMethod === 'paypal'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  PayPal
                </label>
                <label>
                  <input
                    type="radio"
                    value="bancontact"
                    checked={paymentMethod === 'bancontact'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Bancontact
                </label>
              </div>
            </div>

            {/* Résumé + bouton payer */}
            <div className="cart-summary">
              <h3>Total: {total.toFixed(2)} €</h3>
              <form onSubmit={handleCheckout}>
                <button type="submit" className="btn-pay">
                  Payer
                </button>
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