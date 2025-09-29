import { Link, usePage } from '@inertiajs/react';
import '../../css/produit.css'
import Footer from '@/Components/Footer';
import Nav from '@/Components/Nav';

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
          <h3>Filtres</h3>

          <div className="filter-group">
            <h4>Catégories</h4>
            <ul>
              <li>
                <Link href={route("produits")} method="get">
                  Toutes
                </Link>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={route("produits")}
                    method="get"
                    data={{ categorie: cat.id, search: filters.search }}
                    className={
                      Number(filters.categorie) === cat.id ? "active" : ""
                    }
                  >
                    {cat.nom}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="filter-group">
            <h4>Couleur</h4>
            <ul>
              <li>
                <Link href={route("produits")} method="get">
                  Toutes
                </Link>
              </li>
              <li>
                <Link
                  href={route("produits")}
                  method="get"
                  data={{ couleur: "Blanc", search: filters.search }}
                  className={filters.couleur === "Blanc" ? "active" : ""}
                >
                  Blanc
                </Link>
              </li>
              <li>
                <Link
                  href={route("produits")}
                  method="get"
                  data={{ couleur: "Noir", search: filters.search }}
                  className={filters.couleur === "Noir" ? "active" : ""}
                >
                  Noir
                </Link>
              </li>
            </ul>
          </div>
        </aside>

        {/* === Liste Produits === */}
        <main className="produits-list">
          {produits.data.length > 0 ? (
            produits.data.map((p) => (
              <div
                className="card group flex-1 basis-[45%]"
                key={p.id}
              >
                <div className="card-content">
                  <div className="text-section">
                    <h3 className="text-lg font-bold capitalize">{p.nom}</h3>
                    <p className="price">{p.prix} €</p>
                    <Link
                      href={route("details.show", p.id)}
                      className="explore-link opacity-0 group-hover:opacity-100 transition"
                    >
                      EXPLORE NOW →
                    </Link>
                  </div>
                  <img
                    src={`/storage/${p.image1}`}
                    alt={p.nom}
                    className="image-section"
                  />
                </div>
              </div>
            ))
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