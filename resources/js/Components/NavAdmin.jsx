import { Link, usePage } from '@inertiajs/react'
import '../../css/navadmin.css'
import {  FaBars } from "react-icons/fa";
import { useState } from 'react';

export default function NavAdmin() {
  const { auth } = usePage().props; 
  const user = auth?.user;
  const initials = (user?.pseudo?.charAt(0) || user?.nom?.charAt(0) || 'U').toUpperCase();
  const username = user?.pseudo || user?.nom || 'User';
  const cartCount = auth?.cartCount || 0;

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="admin-navbar">
      <div className="admin-logo-container">
        <Link href="/"><h1 className="admin-logo">Aranoz.</h1></Link>
        <span className="admin-badge">admin</span>
      </div>

      {/* Menu Burger (mobile only) */}
      <div className="admin-burger-menu" onClick={() => setMenuOpen(!menuOpen)}>
        <FaBars />
      </div>

      <nav className={`admin-navbar-center ${menuOpen ? 'open' : ''}`}>
        <div className="admin-nav-item dropdown">
          <span className="admin-nav-link">Admin ▾</span>
          <div className="admin-dropdown-menu">
            <Link href="/admin/categories" className="admin-dropdown-item">Categories</Link>
          </div>
        </div>

        <div className="admin-nav-item dropdown">
          <span className="admin-nav-link">Users ▾</span>
          <div className="admin-dropdown-menu">
            <Link href="/admin/users" className="admin-dropdown-item">Users</Link>
          </div>
        </div>

        <Link href="/contact" className="admin-nav-link">Contact</Link>

        <div className="admin-nav-item dropdown">
          <span className="admin-nav-link">Blog ▾</span>
          <div className="admin-dropdown-menu">
            <Link href="/blog" className="admin-dropdown-item">Blogs</Link>
          </div>
        </div>

        <div className="admin-nav-item dropdown">
          <span className="admin-nav-link">Products ▾</span>
          <div className="admin-dropdown-menu">
            <Link href="/products" className="admin-dropdown-item">Products</Link> 
          </div>
        </div>

        <div className="admin-nav-item dropdown">
          <span className="admin-nav-link">Mailbox ▾</span>
          <div className="admin-dropdown-menu">
            <Link href="/messages" className="admin-dropdown-item">Messages</Link> 
          </div>
        </div>
      </nav>

      <div className="admin-navbar-right">

        <div className="admin-nav-item dropdown admin-user-menu">
          <div className="admin-nav-link admin-user-trigger" role="button" tabIndex={0}>
            <div className="admin-user-avatar">{initials}</div>
            <span className="admin-username">{username}</span>
            <span className="admin-chev">▾</span>
          </div> 

          <div className="admin-dropdown-menu admin-user-dropdown">
            <Link href="/" className="admin-dropdown-item">Back Home</Link>
            <Link href={route ? route('logout') : '/logout'} method="post" as="button" className="admin-dropdown-item">Logout</Link>
          </div>
        </div>
      </div>
    </header>
  )
}