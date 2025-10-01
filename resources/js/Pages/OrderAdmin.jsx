import Footer from '@/Components/Footer'
import NavAdmin from '@/Components/NavAdmin'
import { usePage, router } from '@inertiajs/react'
import '../../css/orderadmin.css'

export default function OrderAdmin({ bannerImage }) {
  const { commandes } = usePage().props

  const handleValidate = (id) => {
    router.put(route('orders.confirm', id))
  }

  return (
    <div>
      <NavAdmin />
      <div className="carouDetailsnav">
        <div className="div1details" style={{ marginLeft: '15%' }}>
          <h2 className="detailsH1">Orders Settings</h2>
          <p className="detailsP">Aranoz - Shop System</p>
        </div>
        <div className="div2details">
          <img className="detailsCarouImg" src={bannerImage} alt="" />
        </div>
      </div>

      <div className="orders-section">
        <h3 className="section-title">Pending orders</h3>
        <table className="orders-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Products</th>
              <th>Price</th>
              <th>Order N°</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {commandes.filter(c => c.status === 'pending').map(c => (
              <tr key={c.id}>
                <td>{c.user.name}</td>
                <td>{c.user.email}</td>
                <td>
                  {c.produits.map((p, i) => (
                    <div key={i}>
                      {p.nom} x {p.pivot.quantite} — {Number(p.pivot.prix).toFixed(2)} €
                    </div>
                  ))}
                </td>
                <td>{Number(c.prix).toFixed(2)} €</td>
                <td>{c.numRandom}</td>
                <td>{new Date(c.created_at).toLocaleDateString()}</td>
                <td><span className="badge pending">{c.status}</span></td>
                <td>
                  <button
                    onClick={() => handleValidate(c.id)}
                    className="btn-validate"
                  >
                    Validate?
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 className="section-title">Validated orders</h3>
        <table className="orders-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Products</th>
              <th>Price</th>
              <th>Order N°</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {commandes.filter(c => c.status === 'confirmed').map(c => (
              <tr key={c.id}>
                <td>{c.user.name}</td>
                <td>{c.user.email}</td>
                <td>
                  {c.produits.map((p, i) => (
                    <div key={i}>
                      {p.nom} x {p.pivot.quantite}
                    </div>
                  ))}
                </td>
                <td>{Number(c.prix).toFixed(2)} €</td>
                <td>{c.numRandom}</td>
                <td>{new Date(c.created_at).toLocaleDateString()}</td>
                <td><span className="badge confirmed">Confirmed</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Footer />
    </div>
  )
}