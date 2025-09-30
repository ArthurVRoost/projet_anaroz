import { usePage } from '@inertiajs/react'
import '../../css/order.css'
import Nav from '@/Components/Nav'
import Footer from '@/Components/Footer'

export default function Order() {
  const { commandes } = usePage().props

  return (
    <div>
      <Nav />
      <div className="orders-container">
        <h2>Mes commandes</h2>

        {commandes.length > 0 ? (
          <table className="orders-table">
            <thead>
              <tr>
                <th>Numéro</th>
                <th>Date</th>
                <th>Statut</th>
                <th>Total</th>
                <th>Produits</th>
              </tr>
            </thead>
            <tbody>
              {commandes.map((cmd) => (
                <tr key={cmd.id}>
                  <td>{cmd.numRandom}</td>
                  <td>{new Date(cmd.created_at).toLocaleDateString()}</td>
                  <td className={`status ${cmd.status}`}>{cmd.status}</td>
                  <td>{Number(cmd.prix).toFixed(2)} €</td>
                  <td>
                    <ul>
                      {cmd.produits.map((p) => (
                        <li key={p.id}>
                          {p.nom} × {p.pivot.quantite} — {Number(p.pivot.prix).toFixed(2)} €
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Vous n’avez encore passé aucune commande.</p>
        )}
      </div>
      <Footer />
    </div>
  )
}