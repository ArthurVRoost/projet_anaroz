import React, { useMemo, useState } from 'react'
import '../../css/users.css'
import NavAdmin from '@/Components/NavAdmin'
import Footer from '@/Components/Footer'
import { useForm } from '@inertiajs/react'

export default function Users({ bannerImage, users = [], roles = [] }) {
  // CREATE form
  const createForm = useForm({
    nom: "", prenom: "", pseudo: "", email: "",
    password: "", password_confirmation: "", role_id: ""
  })

  // EDIT form
  const editForm = useForm({
    id: null, nom: "", prenom: "", pseudo: "", email: "", role_id: "", password: "", password_confirmation: ""
  })

  const [editingUserId, setEditingUserId] = useState(null)
  const [showUser, setShowUser] = useState(null) // pour "Show"

  const handleCreate = (e) => {
    e.preventDefault()
    createForm.post(route('users.store'), {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => createForm.reset(),
    })
  }

  const startEdit = (u) => {
    setEditingUserId(u.id)
    editForm.setData({
      id: u.id,
      nom: u.nom || "",
      prenom: u.prenom || "",
      pseudo: u.pseudo || "",
      email: u.email || "",
      role_id: u.role_id ?? 2,
      password: "",
      password_confirmation: ""
    })
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    editForm.put(route('users.update', editForm.data.id), {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => setEditingUserId(null),
    })
  }

  const handleDelete = (id) => {
    editForm.delete(route('users.destroy', id), {
      preserveScroll: true,
      preserveState: true,
    })
  }

  const fullName = (u) => u?.pseudo || `${u?.prenom ?? ''} ${u?.nom ?? ''}`.trim()

  return (
    <div>
      <NavAdmin/>
      <div className="carouDetailsnav">
        <div className="div1details " style={{ marginLeft: '15%' }}>
          <h2 className="detailsH1">Users Settings</h2>
          <p className="detailsP">Aranoz - Shop System</p>
        </div>
        <div className="div2details">
          <img className="detailsCarouImg" src={bannerImage} alt="" />
        </div>
      </div>

      {/* CREATE */}
      <section className="users-section">
        <h2>Add User</h2>
        <form onSubmit={handleCreate} className="user-form">
          <input placeholder="Nom" value={createForm.data.nom}
                 onChange={e => createForm.setData('nom', e.target.value)} />
          <input placeholder="Prénom" value={createForm.data.prenom}
                 onChange={e => createForm.setData('prenom', e.target.value)} />
          <input placeholder="Pseudo" value={createForm.data.pseudo}
                 onChange={e => createForm.setData('pseudo', e.target.value)} />
          <input type="email" placeholder="Email" value={createForm.data.email}
                 onChange={e => createForm.setData('email', e.target.value)} />
          <input type="password" placeholder="Password" value={createForm.data.password}
                 onChange={e => createForm.setData('password', e.target.value)} />
          <input type="password" placeholder="Confirm Password" value={createForm.data.password_confirmation}
                 onChange={e => createForm.setData('password_confirmation', e.target.value)} />
          <select value={createForm.data.role_id}
                  onChange={e => createForm.setData('role_id', e.target.value)}>
            <option value="">Rôle (défaut: User)</option>
            {roles?.map(r => <option key={r.id} value={r.id}>{r.nom}</option>)}
          </select>
          <button type="submit">Create</button>
        </form>

        {/* erreurs simples */}
        {Object.values(createForm.errors || {}).length > 0 && (
          <div className="form-errors">
            {Object.values(createForm.errors).map((err, i) => <p key={i}>{err}</p>)}
          </div>
        )}
      </section>

      {/* LIST */}
      <section className="users-section">
        <h2>All Users</h2>
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Title</th>
              <th>Status</th>
              <th>Actions</th>
              <th>Actions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map(u => (
              <tr key={u.id}>
                {/* Name (avatar + name) */}
                <td className="cell-name">
                  <div className="avatar">{(u.pseudo?.[0] || u.prenom?.[0] || u.nom?.[0] || 'U').toUpperCase()}</div>
                  <span className="name-text">{fullName(u)}</span>
                </td>

                {/* Title (email) */}
                <td className="muted">{u.email}</td>

                {/* Status (role badge) */}
                <td>
                  <span className={`role-badge role-${(u.role?.nom || '').toLowerCase().replace(/\s+/g,'-')}`}>
                    {u.role?.nom || '—'}
                  </span>
                </td>

                {/* Actions: Show */}
                <td>
                  <button className="link-btn" onClick={() => setShowUser(u)}>Show</button>
                </td>

                {/* Actions: Edit */}
                <td>
                  {editingUserId === u.id ? (
                    <form onSubmit={handleUpdate} className="inline-form">
                      <input value={editForm.data.nom} onChange={e=>editForm.setData('nom', e.target.value)} placeholder="Nom" />
                      <input value={editForm.data.prenom} onChange={e=>editForm.setData('prenom', e.target.value)} placeholder="Prénom" />
                      <input value={editForm.data.pseudo} onChange={e=>editForm.setData('pseudo', e.target.value)} placeholder="Pseudo" />
                      <input type="email" value={editForm.data.email} onChange={e=>editForm.setData('email', e.target.value)} placeholder="Email" />
                      <select value={editForm.data.role_id} onChange={e=>editForm.setData('role_id', e.target.value)}>
                        {roles?.map(r => <option key={r.id} value={r.id}>{r.nom}</option>)}
                      </select>
                      {/* Password optionnel en edit */}
                      <input type="password" placeholder="New password (optional)"
                             value={editForm.data.password}
                             onChange={e=>editForm.setData('password', e.target.value)} />
                      <input type="password" placeholder="Confirm (optional)"
                             value={editForm.data.password_confirmation}
                             onChange={e=>editForm.setData('password_confirmation', e.target.value)} />
                      <div className="edit-actions">
                        <button type="submit" className="save-btn">Save</button>
                        <button type="button" className="cancel-btn" onClick={()=>setEditingUserId(null)}>Cancel</button>
                      </div>
                    </form>
                  ) : (
                    <button className="link-btn" onClick={() => startEdit(u)}>Edit</button>
                  )}
                </td>

                {/* Actions: Delete */}
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(u.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Modal Show (local, pas de route) */}
      {showUser && (
        <div className="modal-backdrop" onClick={() => setShowUser(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>User details</h3>
            <p><strong>Nom:</strong> {showUser.nom}</p>
            <p><strong>Prénom:</strong> {showUser.prenom}</p>
            <p><strong>Pseudo:</strong> {showUser.pseudo}</p>
            <p><strong>Email:</strong> {showUser.email}</p>
            <p><strong>Rôle:</strong> {showUser.role?.nom || '—'}</p>
            <div className="modal-actions">
              <button onClick={() => setShowUser(null)} className="save-btn">Close</button>
            </div>
          </div>
        </div>
      )}

      <Footer/>
    </div>
  )
}