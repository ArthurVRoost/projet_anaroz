import Footer from '@/Components/Footer'
import NavAdmin from '@/Components/NavAdmin'
import { usePage, router, useForm } from '@inertiajs/react'
import { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import '../../css/blogadmin.css'
import React, { Fragment } from 'react'
export default function BlogAdmin({ bannerImage }) {
  const { blogs, categories } = usePage().props
  const [editingId, setEditingId] = useState(null)
  const [showingId, setShowingId] = useState(null)

  const { data, setData, post, reset, processing, errors } = useForm({
    titre: '',
    description: '',
    blogcategorie_id: '',
    blog_path: null,
  })

  // CREATE 
  const handleSubmit = (e) => {
    e.preventDefault()
    post(route('blogs.store'), {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => {
        reset()
        toast.success(' Blog créé avec succès')
      },
      onError: () => {
        toast.error(' Erreur lors de la création du blog')
      }
    })
  }

  /** EDIT */
  const handleEdit = (blog) => {
    setEditingId(blog.id)
    setData({
      titre: blog.titre,
      description: blog.description,
      blogcategorie_id: blog.blogcategorie_id,
      blog_path: null
    })
  }

  /** UPDATE */
  const handleUpdate = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('_method', 'PUT')
    formData.append('titre', data.titre)
    formData.append('description', data.description)
    formData.append('blogcategorie_id', data.blogcategorie_id)
    if (data.blog_path) {
      formData.append('blog_path', data.blog_path)
    }

    router.post(route('blogs.update', editingId), formData, {
      preserveScroll: true,
      onSuccess: () => {
        setEditingId(null)
        reset()
        toast.success(' Blog mis à jour')
      },
      onError: () => {
        toast.error(' Erreur lors de la mise à jour')
      }
    })
  }

  /** DEL */
  const handleDelete = (id) => {
    toast((t) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span>Voulez-vous vraiment supprimer ce blog ?</span>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => {
              router.delete(route('blogs.destroy', id), {
                preserveScroll: true,
                onSuccess: () => {
                  toast.dismiss(t.id)
                  toast.success(' Blog supprimé')
                },
                onError: () => toast.error('Erreur lors de la suppression')
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
      <Toaster position="top-right" />

      <div className="carouDetailsnav">
        <div className="div1details" style={{ marginLeft: '15%' }}>
          <h2 className="detailsH1">Blogs Settings</h2>
          <p className="detailsP">Aranoz - Shop System</p>
        </div>
        <div className="div2details">
          <img className="detailsCarouImg" src={bannerImage} alt="" />
        </div>
      </div>

      <div className="blog-admin-container">

        {/* TABLE DES BLOGS */}
        <table className="blog-table">
          <thead>
            <tr>
              <th>Picture</th>
              <th>Blog</th>
              <th>Categorie</th>
              <th>User Role</th>
              <th>Details</th>
              <th>Modification</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((b) => (
              <Fragment key={b.id}>
                <tr>
                  <td>{b.blog_path && <img src={`/${b.blog_path}`} alt="" className="blog-thumb" />}</td>
                  <td>{b.titre}</td>
                  <td>{b.categorie?.nom}</td>
                  <td><span className="role-badge">{b.user?.name || 'admin'}</span></td>
                  <td>
                    <button onClick={() => handleShow(b.id)} className="btn-show">
                      {showingId === b.id ? 'Hide' : 'Show'}
                    </button>
                  </td>
                  <td>
                    <button onClick={() => handleEdit(b)} className="btn-edit">Edit</button>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(b.id)} className="btn-delete">Delete</button>
                  </td>
                </tr>
                {showingId === b.id && (
                  <tr>
                    <td colSpan="7" style={{ padding: '20px', backgroundColor: '#f9f9f9' }}>
                      <strong>Description complète:</strong>
                      <p>{b.description}</p>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>

        {/* FORM EDIT */}
        {editingId && (
          <form onSubmit={handleUpdate} className="blog-form">
            <h3>Edit blog #{editingId}</h3>
            <input
              type="text"
              value={data.titre}
              placeholder="Titre"
              onChange={(e) => setData('titre', e.target.value)}
              required
            />
            <textarea
              value={data.description}
              placeholder="Description"
              onChange={(e) => setData('description', e.target.value)}
              required
            />
            <select
              value={data.blogcategorie_id}
              onChange={(e) => setData('blogcategorie_id', e.target.value)}
              required
            >
              <option value="">Choisir une catégorie</option>
              {categories?.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.nom}</option>
              ))}
            </select>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setData('blog_path', e.target.files[0])}
            />
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" className="btn-save" disabled={processing}>
                {processing ? 'Saving...' : 'Update'}
              </button>
              <button type="button" onClick={cancelEdit} className="btn-cancel">
                Cancel
              </button>
            </div>
            {errors && Object.keys(errors).length > 0 && (
              <div style={{ color: 'red', marginTop: '10px' }}>
                {Object.values(errors).map((err, i) => <div key={i}>{err}</div>)}
              </div>
            )}
          </form>
        )}

        {/* FORM ADD */}
        {!editingId && (
          <form onSubmit={handleSubmit} className="blog-form">
            <h3>Add new blog</h3>
            <input
              type="text"
              value={data.titre}
              placeholder="Titre"
              onChange={(e) => setData('titre', e.target.value)}
              required
            />
            <textarea
              value={data.description}
              placeholder="Description"
              onChange={(e) => setData('description', e.target.value)}
              required
            />
            <select
              value={data.blogcategorie_id}
              onChange={(e) => setData('blogcategorie_id', e.target.value)}
              required
            >
              <option value="">Choisir une catégorie</option>
              {categories?.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.nom}</option>
              ))}
            </select>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setData('blog_path', e.target.files[0])}
            />
            <button type="submit" className="btn-save" disabled={processing}>
              {processing ? 'Saving...' : 'Save'}
            </button>
            {errors && Object.keys(errors).length > 0 && (
              <div style={{ color: 'red', marginTop: '10px' }}>
                {Object.values(errors).map((err, i) => <div key={i}>{err}</div>)}
              </div>
            )}
          </form>
        )}
      </div>

      <Footer />
    </div>
  )
}