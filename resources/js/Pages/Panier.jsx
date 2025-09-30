import { usePage, router } from '@inertiajs/react'
import '../../css/cart.css'
import Nav from '@/Components/Nav'
import Footer from '@/Components/Footer'

export default function Panier() {
  const { paniers } = usePage().props

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
            <div className="cart-summary">
              <h3>Total: {total.toFixed(2)} €</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  router.post(route('cart.checkout'))
                }}
              >
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