import { Link, usePage } from '@inertiajs/react'
import '../../css/nav.css'
import { FaShoppingCart, FaBars } from "react-icons/fa";
import { useState, useEffect } from 'react';

export default function Nav() {
  const { auth, cartCount } = usePage().props; 
  const user = auth?.user;
  const initials = (user?.pseudo?.charAt(0) || user?.nom?.charAt(0) || 'U').toUpperCase();
  const username = user?.pseudo || user?.nom || 'User';
  const roleId = user?.role_id;
  const canAccessBackoffice = user && roleId && ![1, 2].includes(roleId);

  const [menuOpen, setMenuOpen] = useState(false);
  const [cartAnimate, setCartAnimate] = useState(false);

  // ✅ Animation déclenchée à chaque ajout
  useEffect(() => {
    const handleCartUpdate = () => {
      setCartAnimate(true);
      setTimeout(() => setCartAnimate(false), 1200);
    };

    window.addEventListener("cart-updated", handleCartUpdate);
    return () => window.removeEventListener("cart-updated", handleCartUpdate);
  }, []);

  return (
    <header className="navbar">
      <div className="navbar-left">
        <Link href="/"><h1 className="logo">Aranoz.</h1></Link>
      </div>

      <div className="burger-menu" onClick={() => setMenuOpen(!menuOpen)}>
        <FaBars />
      </div>

      <nav className={`navbar-center ${menuOpen ? 'open' : ''}`}>
        <Link href="/" className="nav-link">Home</Link>
        <div className="nav-item dropdown">
          <span className="nav-link">Shop ▾</span>
          <div className="dropdown-menu">
            <Link href="/produits" className="dropdown-item">Shop category</Link>
            <Link href="/track" className="dropdown-item">Track your order</Link>
          </div>
        </div>
        <div className="nav-item dropdown">
          <span className="nav-link">Blog ▾</span>
          <div className="dropdown-menu">
            <Link href="/blog" className="dropdown-item">Blogs table</Link>
          </div>
        </div>
        <Link href="/contact" className="nav-link">Contact</Link>
      </nav>

      <div className="navbar-right">
        <Link href="/cart" className={`cart-link ${cartAnimate ? "cart-flash" : ""}`} aria-label="Cart">
          <span className="cart-icon"><FaShoppingCart /></span>
          {Number(cartCount) > 0 && <span className="cart-count">{cartCount}</span>}
        </Link>

        {user ? (
          <div className="nav-item dropdown user-menu">
            <div className="nav-link user-trigger">
              <div className="user-avatar">{initials}</div>
              <span className="username">{username}</span>
              <span className="chev">▾</span>
            </div>
            <div className="dropdown-menu user-dropdown">
              <Link href="/orders" className="dropdown-item">Mes commandes</Link>
              <Link href={route ? route('logout') : '/logout'} method="post" as="button" className="dropdown-item">Logout</Link>
              {canAccessBackoffice && (
                <Link href="/admin" className="dropdown-item">Admin</Link>
              )}
            </div>
          </div>
        ) : (
          <div className="auth-buttons">
            <Link href="/login" className="btn">Login</Link>
            <Link href="/register" className="btn">Register</Link>
          </div>
        )}
      </div>
    </header>
  );
}