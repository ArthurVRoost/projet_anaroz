import Footer from '@/Components/Footer'
import NavAdmin from '@/Components/NavAdmin'
import React from 'react'
import { useForm } from '@inertiajs/react'
import { Toaster, toast } from 'react-hot-toast'
import '../../css/admin.css'

export default function Categories({ bannerImage, produitsCategories, blogCategories, tags }) {
  // forms
  const produitForm = useForm({ nom: "" })
  const blogForm = useForm({ nom: "" })
  const tagForm = useForm({ nom: "" })

  /** 🟢 CREATE PRODUIT CATEGORY */
  const handleProduitSubmit = (e) => {
    e.preventDefault()
    produitForm.post(route('categories.produits.store'), {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => {
        toast.success('Catégorie produit créée avec succès')
        produitForm.reset()
      },
      onError: () => toast.error('Erreur lors de la création de la catégorie produit')
    })
  }

  /** 🟢 CREATE BLOG CATEGORY */
  const handleBlogSubmit = (e) => {
    e.preventDefault()
    blogForm.post(route('categories.blog.store'), {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => {
        toast.success('Catégorie blog créée avec succès')
        blogForm.reset()
      },
      onError: () => toast.error('Erreur lors de la création de la catégorie blog')
    })
  }

  /** 🟢 CREATE TAG */
  const handleTagSubmit = (e) => {
    e.preventDefault()
    tagForm.post(route('categories.tags.store'), {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => {
        toast.success('Tag créé avec succès')
        tagForm.reset()
      },
      onError: () => toast.error('Erreur lors de la création du tag')
    })
  }

  /** 🗑️ DELETE avec confirmation toast */
  const confirmDelete = (deleteFn, id, type) => {
    toast((t) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span>Supprimer cette {type} ?</span>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => {
              deleteFn(route(`categories.${type}.destroy`, id), {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                  toast.dismiss(t.id)
                  toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} supprimée`)
                },
                onError: () => toast.error(`Erreur lors de la suppression de la ${type}`)
              })
            }}
            style={{
              backgroundColor: '#FD3166',
              color: 'white',
              borderRadius: '5px',
              padding: '5px 10px',
              border: 'none'
            }}
          >
            Oui
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            style={{
              backgroundColor: '#ccc',
              borderRadius: '5px',
              padding: '5px 10px',
              border: 'none'
            }}
          >
            Annuler
          </button>
        </div>
      </div>
    ), { duration: 4000 })
  }

  return (
    <div>
      <NavAdmin />
      <Toaster position="top-right" />

      <div className="carouDetailsnav">
        <div className="div1details" style={{ marginLeft: '15%' }}>
          <h2 className="detailsH1">Categories Settings</h2>
          <p className="detailsP">Aranoz - Shop System</p>
        </div>
        <div className="div2details">
          <img className="detailsCarouImg" src={bannerImage} alt="" />
        </div>
      </div>

      {/* PRODUITS */}
      <section className="categories-section">
        <h2>Produits Categories</h2>
        <ul className="categories-list">
          {produitsCategories.map((cat) => (
            <li key={cat.id} className="category-item">
              {cat.nom}
              <button
                onClick={() => confirmDelete(produitForm.delete, cat.id, 'produits')}
                className="delete-btn"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <form onSubmit={handleProduitSubmit} className="category-form">
          <input
            type="text"
            placeholder="New category..."
            value={produitForm.data.nom}
            onChange={(e) => produitForm.setData("nom", e.target.value)}
          />
          <button type="submit" className="create-btn">Create</button>
        </form>
      </section>

      {/* BLOG */}
      <section className="categories-section">
        <h2>Blog Categories</h2>
        <ul className="categories-list">
          {blogCategories.map((cat) => (
            <li key={cat.id} className="category-item">
              {cat.nom}
              <button
                onClick={() => confirmDelete(blogForm.delete, cat.id, 'blog')}
                className="delete-btn"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <form onSubmit={handleBlogSubmit} className="category-form">
          <input
            type="text"
            placeholder="New blog category..."
            value={blogForm.data.nom}
            onChange={(e) => blogForm.setData("nom", e.target.value)}
          />
          <button type="submit" className="create-btn">Create</button>
        </form>
      </section>

      {/* TAGS */}
      <section className="categories-section">
        <h2>Tags</h2>
        <ul className="categories-list">
          {tags.map((tag) => (
            <li key={tag.id} className="category-item">
              {tag.nom}
              <button
                onClick={() => confirmDelete(tagForm.delete, tag.id, 'tags')}
                className="delete-btn"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <form onSubmit={handleTagSubmit} className="category-form">
          <input
            type="text"
            placeholder="New tag..."
            value={tagForm.data.nom}
            onChange={(e) => tagForm.setData("nom", e.target.value)}
          />
          <button type="submit" className="create-btn">Create</button>
        </form>
      </section>

      <Footer />
    </div>
  )
}