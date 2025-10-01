import React, { useState } from 'react'
import '../../css/users.css'
import NavAdmin from '@/Components/NavAdmin'
import Footer from '@/Components/Footer'
import { useForm } from '@inertiajs/react'

export default function Users({ bannerImage, users, roles }) {
  const createForm = useForm({ name: "", email: "", role_id: "" })
  const editForm = useForm({ id: null, name: "", email: "", role_id: "" })

  const [editingUser, setEditingUser] = useState(null)

  const handleCreate = (e) => {
    e.preventDefault()
    createForm.post(route('users.store'), {
      preserveScroll: true,
      onSuccess: () => createForm.reset(),
    })
  }

  const handleEdit = (user) => {
    setEditingUser(user.id)
    editForm.setData({
      id: user.id,
      name: user.name,
      email: user.email,
      role_id: user.role_id,
    })
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    editForm.put(route('users.update', editForm.data.id), {
      preserveScroll: true,
      onSuccess: () => setEditingUser(null),
    })
  }

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

      {/* CREATE USER */}
      <section className="users-section">
        <h2>Add User</h2>
        <form onSubmit={handleCreate} className="user-form">
          <input 
            type="text" 
            placeholder="Name" 
            value={createForm.data.name}
            onChange={(e) => createForm.setData("name", e.target.value)}
          />
          <input 
            type="email" 
            placeholder="Email" 
            value={createForm.data.email}
            onChange={(e) => createForm.setData("email", e.target.value)}
          />
          <select 
            value={createForm.data.role_id} 
            onChange={(e) => createForm.setData("role_id", e.target.value)}
          >
            <option value="">Select Role</option>
            {roles.map(role => (
              <option key={role.id} value={role.id}>{role.nom}</option>
            ))}
          </select>
          <button type="submit">Create</button>
        </form>
      </section>

      {/* LIST USERS */}
      <section className="users-section">
        <h2>All Users</h2>
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th colSpan="3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                {editingUser === user.id ? (
                  <>
                    <td>
                      <input 
                        type="text" 
                        value={editForm.data.name} 
                        onChange={(e) => editForm.setData("name", e.target.value)} 
                      />
                    </td>
                    <td>
                      <input 
                        type="email" 
                        value={editForm.data.email} 
                        onChange={(e) => editForm.setData("email", e.target.value)} 
                      />
                    </td>
                    <td>
                      <select 
                        value={editForm.data.role_id}
                        onChange={(e) => editForm.setData("role_id", e.target.value)}
                      >
                        {roles.map(role => (
                          <option key={role.id} value={role.id}>{role.nom}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <button onClick={handleUpdate}>Save</button>
                      <button onClick={() => setEditingUser(null)}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`role-badge role-${user.role?.nom.toLowerCase().replace(" ", "-")}`}>
                        {user.role?.nom}
                      </span>
                    </td>
                    <td>
                      <button onClick={() => handleEdit(user)} className="edit-btn">Edit</button>
                    </td>
                    <td>
                      <button onClick={() => editForm.delete(route('users.destroy', user.id))} className="delete-btn">Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <Footer/>
    </div>
  )
}