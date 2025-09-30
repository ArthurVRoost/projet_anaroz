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
    (acc, p) => acc + (p.produit.promo_prix ?? p.produit.prix) * p.quantite,
    0
  )

  return (
    <div>
      <Nav/>
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
                {paniers.map((item) => (
                  <tr key={item.id}>
                    <td>{item.produit.nom}</td>
                    <td>{item.produit.promo_prix ?? item.produit.prix} €</td>
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
                    <td>
                      {(item.produit.promo_prix ?? item.produit.prix) *
                        item.quantite}{' '}
                      €
                    </td>
                    <td>
                      <button onClick={() => handleDelete(item.id)}>❌</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="cart-summary">
              <h3>Total: {total} €</h3>
              <form onSubmit={(e) => {
                e.preventDefault()
                router.post(route('cart.checkout'))
              }}>
                <button type="submit" className="btn-pay">Payer</button>
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