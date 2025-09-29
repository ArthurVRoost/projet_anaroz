// resources/js/Pages/Details.jsx
import { useState } from "react";
import '../../css/details.css'
import Nav from "@/Components/Nav";

export default function Default({ produit, prixFinal, reduction, specifications }) {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <>
    <Nav/>
    <div className="details-container">
      {/* === Images produit === */}
        <div className="details-images">
        <img
            src={produit.images[0]}
            alt={produit.nom}
            className="main-image"
        />
        <div className="thumbnail-list">
            {produit.images.map((img, i) => (
            <img key={i} src={img} alt="mini" className="thumbnail" />
            ))}
        </div>
    </div>

      {/* === Infos produit === */}
      <div className="details-info">
        <h1 className="details-title">{produit.nom}</h1>

        {/* Prix */}
        <div className="price-wrapper">
            {reduction ? (
                <>
                <span className="old-price">
                    ${Number(produit.prix).toFixed(2)}
                </span>
                <span className="final-price">
                    ${Number(prixFinal).toFixed(2)}
                </span>
                <span className="reduction">(-{reduction}%)</span>
                </>
            ) : (
                <span className="final-price">
                ${Number(produit.prix).toFixed(2)}
                </span>
            )}
        </div>

        {/* Meta produit */}
        <div className="product-meta">
          <p>
            <span>Category:</span> {produit.categorie?.nom}
          </p>
          <p>
            <span>Availability:</span> {produit.stock > 0 ? "In Stock" : "Out of Stock"}
          </p>
        </div>

        {/* === Tabs === */}
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

        {/* === Contenu des tabs === */}
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