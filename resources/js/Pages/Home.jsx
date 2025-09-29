import Carousel from "@/Components/Carousel";
import Nav from "@/Components/Nav";
import { Link } from "@inertiajs/react";
import '../../css/home.css'
export default function Home({ bannerProducts, featuredProducts, shopProducts, bestSellers, offerProduct, categories, imageBaseUrl }) {
  console.log("Featured Products :", featuredProducts);
    return (
        <>
          <Nav/>
          <Carousel bannerProducts={bannerProducts} imageBaseUrl={imageBaseUrl} />
          <section className="py-12">
  <h2 className="text-3xl font-bold text-center mb-10">Featured Category</h2>

  <div className="featured-grid max-w-6xl mx-auto px-4 space-y-6">
    {/* Row 1 (60/40) */}
    <div className="row flex gap-6">
      {/* Big card */}
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

      {/* Small card */}
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

    {/* Row 2 (40/60) */}
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
        </>
    );
}