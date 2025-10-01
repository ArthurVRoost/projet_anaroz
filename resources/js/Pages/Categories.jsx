import Footer from '@/Components/Footer'
import NavAdmin from '@/Components/NavAdmin'
import React from 'react'
import { useForm } from '@inertiajs/react'
import '../../css/admin.css'

export default function Categories({ bannerImage, produitsCategories, blogCategories, tags }) {
  // forms
  const produitForm = useForm({ nom: "" })
  const blogForm = useForm({ nom: "" })
  const tagForm = useForm({ nom: "" })

  const handleProduitSubmit = (e) => {
    e.preventDefault()
    produitForm.post(route('categories.produits.store'), {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => produitForm.reset(),
    })
  }

  const handleBlogSubmit = (e) => {
    e.preventDefault()
    blogForm.post(route('categories.blog.store'), {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => blogForm.reset(),
    })
  }

  const handleTagSubmit = (e) => {
    e.preventDefault()
    tagForm.post(route('categories.tags.store'), {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => tagForm.reset(),
    })
  }

  return (
    <div>
      <NavAdmin/>
      <div className="carouDetailsnav">
        <div className="div1details " style={{ marginLeft: '15%' }}>
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
                onClick={() => produitForm.delete(route('categories.produits.destroy', cat.id), { preserveScroll: true, preserveState: true })}
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
                onClick={() => blogForm.delete(route('categories.blog.destroy', cat.id), { preserveScroll: true, preserveState: true })}
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
                onClick={() => tagForm.delete(route('categories.tags.destroy', tag.id), { preserveScroll: true, preserveState: true })}
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

      <Footer/>
    </div>
  )
}