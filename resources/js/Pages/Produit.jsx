import { Link, usePage } from '@inertiajs/react';
import '../../css/produit.css'
import Footer from '@/Components/Footer';
import Nav from '@/Components/Nav';

// -- Helpers cart (localStorage) --
function getCart() {
  try { return JSON.parse(localStorage.getItem('cart')) || []; } catch { return []; }
}
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  window.dispatchEvent(new CustomEvent('cart:updated')); // pour maj le badge Nav
}
function getFinalPrice(p) {
  // Priorité au prix promo si présent, sinon si promo_percent existe on calcule, sinon prix normal
  if (p.prix_promo != null && p.prix_promo !== '') return Number(p.prix_promo);
  if (p.promo_percent != null) return Math.round((Number(p.prix) * (1 - Number(p.promo_percent)/100)) * 100)/100;
  return Number(p.prix);
}
function addToCart(product) {
  const cart = getCart();
  const idx = cart.findIndex(i => i.id === product.id);
  const basePrice = Number(product.prix);
  const finalPrice = getFinalPrice(product);
  if (idx >= 0) {
    cart[idx].qty += 1;
  } else {
    cart.push({
      id: product.id,
      nom: product.nom,
      image_url: product.image_url,
      prix: basePrice,          // prix original
      prix_final: finalPrice,   // prix après promo si applicable
      promo_percent: product.promo_percent ?? null,
      prix_promo: product.prix_promo ?? null,
      qty: 1,
      couleur: product.couleur ?? null,
      categorie_id: product.categorie_id ?? null,
    });
  }
  saveCart(cart);
}

export default function Produit({bannerImage}){
  const { produits, categories, filters } = usePage().props;

  return(
    <>
      <Nav/>
      <div className="carouDetails">
        <div className="div1details " style={{marginLeft:'15%'}}>
          <h2 className="detailsH1">Shop Category</h2>
          <p className="detailsP">Home - Shop Category</p>
        </div>
        <div className="div2details">
          <img className="detailsCarouImg" src={bannerImage} alt="" />
        </div>
      </div>

      <div className="produits-page">
        {/* === Barre de recherche === */}
        <form method="get" className="search-bar">
          <input
            type="text"
            name="search"
            defaultValue={filters.search || ""}
            placeholder="Rechercher un produit..."
          />
          <button type="submit">Rechercher</button>
        </form>

        <div className="content">
          {/* === Sidebar Filtres === */}
          <aside className="filters">
            <h3 style={{fontWeight:'bold'}}>Filtres</h3>

            <div className="filter-group">
              <h4 style={{fontWeight:'bold'}}>Catégories</h4>
              <ul>
                <li>
                  <Link  href={route("produits")} method="get">Toutes</Link>
                </li>
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <Link
                      href={route("produits")}
                      method="get"
                      data={{ categorie: cat.id, search: filters.search }}
                      className={Number(filters.categorie) === cat.id ? "active" : ""}
                    >
                      {cat.nom}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="filter-group">
              <h4 style={{fontWeight:'bold'}}>Couleur</h4>
              <ul>
                <li><Link href={route("produits")} method="get">Toutes</Link></li>
                <li>
                  <Link
                    href={route("produits")}
                    method="get"
                    data={{ couleur: "Blanc", search: filters.search }}
                    className={filters.couleur === "Blanc" ? "active" : ""}
                  >Blanc</Link>
                </li>
                <li>
                  <Link
                    href={route("produits")}
                    method="get"
                    data={{ couleur: "Noir", search: filters.search }}
                    className={filters.couleur === "Noir" ? "active" : ""}
                  >Noir</Link>
                </li>
              </ul>
            </div>
          </aside>

          {/* === Liste Produits === */}
          <main className="produits-list">
            {produits.data.length > 0 ? (
              produits.data.map((p) => {
                const finalPrice = getFinalPrice(p);
                const hasPromo = finalPrice !== Number(p.prix);
                return (
                  <div className="produit-card" key={p.id}>
                    <img src={p.image_url} alt={p.nom} className="produit-img" />
                    <div className="produit-info">
                      <h3>{p.nom}</h3>
                      <div className="price-row">
                        {hasPromo ? (
                          <>
                            <span className="price-final">{finalPrice} €</span>
                            <span className="price-old">{Number(p.prix)} €</span>
                            {p.promo_percent != null && (
                              <span className="badge-promo">-{p.promo_percent}%</span>
                            )}
                          </>
                        ) : (
                          <span className="price">{Number(p.prix)} €</span>
                        )}
                      </div>

                      <div className="card-actions">
                        <Link href={route("details.show", p.id)} className="explore-link">
                          EXPLORE NOW →
                        </Link>
                        <button
                          type="button"
                          className="btn-add"
                          onClick={() => addToCart(p)}
                        >
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <p>Aucun produit trouvé</p>
            )}
          </main>
        </div>
      </div>
      <Footer/>
    </>
  )
}