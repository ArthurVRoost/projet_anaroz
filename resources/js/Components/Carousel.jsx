import { useState } from "react";
import '../../css/carousel.css'
export default function Carousel({ bannerProducts, imageBaseUrl }) {
    const [current, setCurrent] = useState(0);

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % bannerProducts.length);
    };

    const prevSlide = () => {
        setCurrent((prev) =>
            prev === 0 ? bannerProducts.length - 1 : prev - 1
        );
    };
    return (
        <div className="carousel-container">
            {bannerProducts.map((product, index) => (
                <div
                    key={product.id}
                    className={`carousel-slide ${
                        index === current ? "active" : ""
                    }`}
                >
                    <div className="carousel-text">
                        <h1>{product.nom}</h1>
                        <p>{product.description}</p>
                    </div>
                    <div className="carousel-img">
                        <img
                            src={`${imageBaseUrl}/banner/${product.image1}`}
                            alt={product.nom}
                        />
                    </div>
                </div>
            ))}
            <button className="carousel-btn prev" onClick={prevSlide}>
                Previous
            </button>
            <button className="carousel-btn next" onClick={nextSlide}>
                Next
            </button>
        </div>
    );
}