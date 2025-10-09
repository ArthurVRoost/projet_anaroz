import { useState } from "react";
import '../../css/details.css';
import Nav from "@/Components/Nav";
import { router } from "@inertiajs/react";
import { Toaster, toast } from "react-hot-toast";

export default function Default({ produit, prixFinal, reduction, specifications, bannerImage }) {
  const [activeTab, setActiveTab] = useState("description");
  const [activeImage, setActiveImage] = useState(produit.images[0] || "/placeholder.png");
  const [fade, setFade] = useState(false);

  const handleThumbnailClick = (img) => {
    setFade(true);
    setTimeout(() => {
      setActiveImage(img);
      setFade(false);
    }, 200);
  };

  const handleAddToCart = (id) => {
    router.post(route("cart.store"), { produit_id: id }, {
      preserveState: true,
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Produit ajouté au panier !', {
          duration: 3000,
          style: {
            border: '1px solid #FD3166',
            padding: '12px 18px',
            color: '#fff',
            background: 'linear-gradient(135deg, #FD3166 0%, #ff6f9d 100%)',
            fontWeight: 'bold',
            fontSize: '14px',
            boxShadow: '0 4px 15px rgba(253, 49, 102, 0.3)',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#FD3166',
          },
        });
      },
      onError: () => toast.error('Erreur lors de l’ajout au panier'),
    });
  };

  return (
    <>
      <Nav />
      <Toaster position="top-right" />

      <div className="carouDetails">
        <div className="div1details">
          <h2 className="detailsH1">Shop Single</h2>
          <p className="detailsP">Home - Shop Single</p>
        </div>
        <div className="div2details">
          <img className="detailsCarouImg" src={bannerImage} alt="" />
        </div>
      </div>

      <div className="details-container">
        <div className="details-images">
          <img
            src={activeImage}
            alt={produit.nom}
            className={`main-image ${fade ? "fade-out" : "fade-in"}`}
          />
          <div className="thumbnail-list">
            {produit.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="mini"
                className={`thumbnail ${img === activeImage ? "active-thumb" : ""}`}
                onClick={() => handleThumbnailClick(img)}
              />
            ))}
          </div>
        </div>

        <div className="details-info">
          <h1 className="details-title">{produit.nom}</h1>

          <div className="price-wrapper">
            {reduction ? (
              <>
                <span className="old-price">{Number(produit.prix).toFixed(2)} €</span>
                <span className="final-price">{Number(prixFinal).toFixed(2)} €</span>
                <span className="reduction">(-{reduction}%)</span>
              </>
            ) : (
              <span className="final-price">{Number(produit.prix).toFixed(2)} €</span>
            )}
          </div>

          <button
            type="button"
            className="add-to-cart-btn"
            onClick={() => handleAddToCart(produit.id)}
          >
            Add to Cart
          </button>

          <div className="product-meta">
            <p><span>Category:</span> {produit.categorie?.nom}</p>
            <p><span>Availability:</span> {produit.stock > 0 ? "In Stock" : "Out of Stock"}</p>
          </div>

          <div className="details-tabs">
            <button
              className={`tab-btn ${activeTab === "description" ? "active" : ""}`}
              onClick={() => setActiveTab("description")}
            >
              Description
            </button>
            <button
              className={`tab-btn ${activeTab === "specification" ? "active" : ""}`}
              onClick={() => setActiveTab("specification")}
            >
              Specification
            </button>
            <button
              className={`tab-btn ${activeTab === "comments" ? "active" : ""}`}
              onClick={() => setActiveTab("comments")}
            >
              Comments
            </button>
          </div>

          <div className="tab-content">
            {activeTab === "description" && <p>{produit.description}</p>}

            {activeTab === "specification" && specifications.length > 0 && (
              <ul>
                {specifications.map((spec, index) => (
                  <li key={index}>
                    <strong>Width:</strong> {spec.width} cm |
                    <strong> Height:</strong> {spec.height} cm |
                    <strong> Depth:</strong> {spec.depth} cm |
                    <strong> Weight:</strong> {spec.weight} kg |
                    <strong> Quality Check:</strong> {spec.quality_check ? "Yes" : "No"}
                  </li>
                ))}
              </ul>
            )}

            {activeTab === "comments" && (
              <form className="comment-form">
                <input type="text" placeholder="Name" />
                <input type="email" placeholder="Email" />
                <input type="text" placeholder="Phone number" />
                <textarea rows="4" placeholder="Message"></textarea>
                <button type="submit">Submit</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}