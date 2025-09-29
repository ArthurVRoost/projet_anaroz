import Carousel from "@/Components/Carousel";
import Nav from "@/Components/Nav";
import { Link } from "@inertiajs/react";
import '../../css/home.css'
import '../../css/awesome.css'
import { useState } from "react";

export default function Home({ bannerProducts, featuredProducts, shopProducts, bestSellers, offerProduct, categories, imageBaseUrl, awesomeProducts }) {
  const [startIndex, setStartIndex] = useState(0);

  const nextSlide = () => {
    setStartIndex((prev) => (prev + 2) % awesomeProducts.length);
  };

  const prevSlide = () => {
    setStartIndex((prev) =>
      (prev - 2 + awesomeProducts.length) % awesomeProducts.length
    );
  };

  // Produits affichés (8 visibles → 2 lignes de 4)
  const visibleProducts = awesomeProducts
    .slice(startIndex, startIndex + 8)
    .concat(
      startIndex + 8 > awesomeProducts.length
        ? awesomeProducts.slice(0, (startIndex + 8) % awesomeProducts.length)
        : []
    );
    return (
        <>
          <Nav/>
          <Carousel bannerProducts={bannerProducts} imageBaseUrl={imageBaseUrl} />
          {/* section 1 */}
          <section className="py-12">
            <h2 className="text-3xl font-bold text-center mb-10">Featured Category</h2>

            <div className="featured-grid max-w-6xl mx-auto px-4 space-y-6">
             
              <div className="row flex gap-6">
                
                <div className="card group flex-1 basis-[55%]">
                  <div className="card-content">
                    <div className="text-section">
                      <h3 className="text-lg font-bold capitalize">{featuredProducts[0].nom}</h3>
                      <Link
                        href={route("details.show", featuredProducts[0].id)}
                        className="explore-link opacity-0 group-hover:opacity-100"
                      >
                        EXPLORE NOW →
                      </Link>
                    </div>
                    <img
                      src={featuredProducts[0].image_url}
                      alt={featuredProducts[0].nom}
                      className="image-section"
                    />
                  </div>
                </div>
                <div className="card group flex-1 basis-[45%]">
                  <div className="card-content">
                    <div className="text-section">
                      <h3 className="text-lg font-bold capitalize">{featuredProducts[1].nom}</h3>
                      <Link
                        href={route("details.show", featuredProducts[1].id)}
                        className="explore-link opacity-0 group-hover:opacity-100"
                      >
                        EXPLORE NOW →
                      </Link>
                    </div>
                    <img
                      src={featuredProducts[1].image_url}
                      alt={featuredProducts[1].nom}
                      className="image-section"
                    />
                  </div>
                </div>
              </div>

             
              <div className="row flex gap-6">
                <div className="card group flex-1 basis-[45%]">
                  <div className="card-content">
                    <div className="text-section">
                      <h3 className="text-lg font-bold capitalize">{featuredProducts[2].nom}</h3>
                      <Link
                        href={route("details.show", featuredProducts[2].id)}
                        className="explore-link opacity-0 group-hover:opacity-100"
                      >
                        EXPLORE NOW →
                      </Link>
                    </div>
                    <img
                      src={featuredProducts[2].image_url}
                      alt={featuredProducts[2].nom}
                      className="image-section"
                    />
                  </div>
                </div>

                <div className="card group flex-1 basis-[55%]">
                  <div className="card-content">
                    <div className="text-section">
                      <h3 className="text-lg font-bold capitalize">{featuredProducts[3].nom}</h3>
                      <Link
                        href={route("details.show", featuredProducts[3].id)}
                        className="explore-link opacity-0 group-hover:opacity-100"
                      >
                        EXPLORE NOW →
                      </Link>
                    </div>
                    <img
                      src={featuredProducts[3].image_url}
                      alt={featuredProducts[3].nom}
                      className="image-section"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* section 2 */}
          <section className="awesome-section">
            <div className="container">
              <div className="awesome-header">
                <div className="awesome-arthur"> 
                  <h2 className="title">Awesome</h2>
                  <span>Shop</span>
                </div>
                <div className="nav-buttons">
                  <button  onClick={prevSlide}>Prev</button>
                  <span> |</span>
                  <button onClick={nextSlide}>Next</button>
                </div>
              </div>

              <div className="awesome-grid">
                {visibleProducts.map((p) => (
                  <div key={p.id} className="awesome-card group">
                    <img src={p.image_url} alt={p.nom} className="image" />
                    <h3 className="name">{p.nom}</h3>
                    <p className="price">${Number(p.prix).toFixed(2)}</p>
                    <Link
                      href={route("details.show", p.id)}
                      className="explore opacity-0 group-hover:opacity-100"
                    >
                      EXPLORE NOW →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>

        </>
    );
}