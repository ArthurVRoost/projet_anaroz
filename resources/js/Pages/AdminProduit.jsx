import React, { useState } from 'react'
import Footer from '@/Components/Footer'
import NavAdmin from '@/Components/NavAdmin'
import { usePage, router, useForm } from '@inertiajs/react'
import '../../css/produitadmin.css'
export default function AdminProduit({ bannerImage }) {
  const { produits, categories, promos } = usePage().props
  const [editingId, setEditingId] = useState(null)
  const [showingId, setShowingId] = useState(null)

  const { data, setData, post, reset, processing, errors } = useForm({
    nom: '',
    description: '',
    prix: '',
    stock: '',
    couleur: '',
    produitscategorie_id: '',
    promo_id: '',
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    }, { forceFormData: true })

  // Créer un produit
  const handleSubmit = (e) => {
        e.preventDefault()
        post(route('produits.store'), {
            preserveScroll: true,
            onSuccess: () => {
            reset()
            alert('Produit créé avec succès !')
            },
            onError: (errors) => {
            console.error(errors)
            alert('Erreur lors de la création')
            }
        })
    }

  // Préparer édition
  const handleEdit = (p) => {
    setEditingId(p.id)
    setData({
      nom: p.nom,
      description: p.description,
      prix: p.prix,
      stock: p.stock,
      couleur: p.couleur,
      produitscategorie_id: p.produitscategorie_id,
      promo_id: p.promo_id || '',
      image1: null,
      image2: null,
      image3: null,
      image4: null,
    })
  }

  // Sauvegarder édition
  const handleUpdate = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('_method', 'PUT')
    Object.keys(data).forEach((key) => {
      if (data[key] !== null) formData.append(key, data[key])
    })

    router.post(route('produits.update', editingId), formData, {
      preserveScroll: true,
      onSuccess: () => {
        setEditingId(null)
        reset()
        alert('Produit mis à jour !')
      },
      onError: (errors) => {
        console.error(errors)
        alert('Erreur lors de la mise à jour')
      }
    })
  }

  // Supprimer
  const handleDelete = (id) => {
    if (confirm('Supprimer ce produit ?')) {
      router.delete(route('produits.destroy', id), {
        preserveScroll: true,
        onSuccess: () => {
          alert('Produit supprimé avec succès !')
        }
      })
    }
  }

  const handleShow = (id) => {
    setShowingId(showingId === id ? null : id)
  }

  const cancelEdit = () => {
    setEditingId(null)
    reset()
  }

  return (
    <div>
      <NavAdmin />
      <div className="carouDetailsnav">
        <div className="div1details" style={{ marginLeft: '15%' }}>
          <h2 className="detailsH1">Products Settings</h2>
          <p className="detailsP">Aranoz - Shop System</p>
        </div>
        <div className="div2details">
          <img className="detailsCarouImg" src={bannerImage} alt="" />
        </div>
      </div>

      <div className="p-6">
        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Nom</th>
              <th className="p-2 border">Prix</th>
              <th className="p-2 border">Stock</th>
              <th className="p-2 border">Categorie</th>
              <th className="p-2 border">Promo</th>
              <th className="p-2 border">Details</th>
              <th className="p-2 border">Edit</th>
              <th className="p-2 border">Delete</th>
            </tr>
          </thead>
          <tbody>
            {produits.map((p) => (
              <React.Fragment key={p.id}>
                <tr>
                    <td className="p-2 border">
                        {p.image_url ? (
                            <img src={p.image_url} alt={p.nom} className="w-16 h-16 object-cover" />
                        ) : (
                            "Pas d’image"
                        )}
                    </td>
                  <td className="p-2 border">{p.nom}</td>
                  <td className="p-2 border">{p.prix} €</td>
                  <td className="p-2 border">{p.stock}</td>
                  <td className="p-2 border">{p.categorie?.nom}</td>
                  <td className="p-2 border">
                    {p.promo ? `${p.promo.nom} (-${p.promo.pourcentage}%)` : '-'}
                  </td>
                  <td className="p-2 border">
                    <button onClick={() => handleShow(p.id)} className="px-2 py-1 bg-gray-300 rounded">
                      {showingId === p.id ? 'Hide' : 'Show'}
                    </button>
                  </td>
                  <td className="p-2 border">
                    <button onClick={() => handleEdit(p)} className="px-2 py-1 bg-green-500 text-white rounded">
                      Edit
                    </button>
                  </td>
                  <td className="p-2 border">
                    <button onClick={() => handleDelete(p.id)} className="px-2 py-1 bg-red-500 text-white rounded">
                      Delete
                    </button>
                  </td>
                </tr>
                {showingId === p.id && (
                  <tr>
                    <td colSpan="9" className="p-4 bg-gray-100">
                      <strong>Description:</strong>
                      <p>{p.description}</p>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        {/* Formulaire EDIT */}
        {editingId && (
          <form onSubmit={handleUpdate} className="mt-6 p-4 bg-gray-100 rounded">
            <h3 className="font-bold mb-2">Éditer produit #{editingId}</h3>
            <input type="text" value={data.nom} placeholder="Nom"
              onChange={(e) => setData('nom', e.target.value)} className="p-2 border w-full mb-2" />
            <textarea value={data.description} placeholder="Description"
              onChange={(e) => setData('description', e.target.value)} className="p-2 border w-full mb-2" />
            <input type="number" value={data.prix} placeholder="Prix"
              onChange={(e) => setData('prix', e.target.value)} className="p-2 border w-full mb-2" />
            <input type="number" value={data.stock} placeholder="Stock"
              onChange={(e) => setData('stock', e.target.value)} className="p-2 border w-full mb-2" />
            <input type="text" value={data.couleur} placeholder="Couleur"
              onChange={(e) => setData('couleur', e.target.value)} className="p-2 border w-full mb-2" />

            <select value={data.produitscategorie_id} onChange={(e) => setData('produitscategorie_id', e.target.value)} className="p-2 border w-full mb-2">
              <option value="">Catégorie</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.nom}</option>)}
            </select>

            <select value={data.promo_id} onChange={(e) => setData('promo_id', e.target.value)} className="p-2 border w-full mb-2">
              <option value="">Promo</option>
              {promos.map(pr => <option key={pr.id} value={pr.id}>{pr.nom}</option>)}
            </select>

            <input type="file" required onChange={(e) => setData("image1", e.target.files[0])} className="p-2 border w-full mb-2" />
                {[2,3,4].map(i => (
                <input key={i} type="file" onChange={(e) => setData(`image${i}`, e.target.files[0])} className="p-2 border w-full mb-2" />
                ))}

            <div className="flex gap-4">
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded" disabled={processing}>
                {processing ? 'Saving...' : 'Update'}
              </button>
              <button type="button" onClick={cancelEdit} className="px-4 py-2 bg-gray-400 rounded">
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Formulaire ADD */}
        {!editingId && (
          <form onSubmit={handleSubmit} className="mt-6 p-4 bg-gray-100 rounded">
            <h3 className="font-bold mb-2">Ajouter un produit</h3>
            <input type="text" value={data.nom} placeholder="Nom"
              onChange={(e) => setData('nom', e.target.value)} className="p-2 border w-full mb-2" />
            <textarea value={data.description} placeholder="Description"
              onChange={(e) => setData('description', e.target.value)} className="p-2 border w-full mb-2" />
            <input type="number" value={data.prix} placeholder="Prix"
              onChange={(e) => setData('prix', e.target.value)} className="p-2 border w-full mb-2" />
            <input type="number" value={data.stock} placeholder="Stock"
              onChange={(e) => setData('stock', e.target.value)} className="p-2 border w-full mb-2" />
            <input type="text" value={data.couleur} placeholder="Couleur"
              onChange={(e) => setData('couleur', e.target.value)} className="p-2 border w-full mb-2" />

            <select value={data.produitscategorie_id} onChange={(e) => setData('produitscategorie_id', e.target.value)} className="p-2 border w-full mb-2">
              <option value="">Catégorie</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.nom}</option>)}
            </select>

            <select value={data.promo_id} onChange={(e) => setData('promo_id', e.target.value)} className="p-2 border w-full mb-2">
              <option value="">Promo</option>
              {promos.map(pr => <option key={pr.id} value={pr.id}>{pr.nom}</option>)}
            </select>

            {[1,2,3,4].map(i => (
              <input key={i} type="file" onChange={(e) => setData(`image${i}`, e.target.files[0])} className="p-2 border w-full mb-2" />
            ))}

            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded" disabled={processing}>
              {processing ? 'Saving...' : 'Save'}
            </button>
          </form>
        )}
      </div>

      <Footer />
    </div>
  )
}