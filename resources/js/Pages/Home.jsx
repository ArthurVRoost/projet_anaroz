import React, { useState } from 'react';
import Navbar from '../Components/Nav';
import Footer from '../Components/Footer';
import '../../css/home.css'
import Nav from '../Components/Nav';
const Home = ({ 
  bannerProducts, 
  featuredProducts, 
  shopProducts, 
  bestSellers, 
  offerProduct, 
  categories,
  imageBaseUrl 
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const getImageUrl = (imageName) => {
    return `${imageBaseUrl}/${imageName}`;
  };

  const nextSlide = () => {
    if (bannerProducts) {
      setCurrentSlide((prev) => 
        prev === bannerProducts.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevSlide = () => {
    if (bannerProducts) {
      setCurrentSlide((prev) => 
        prev === 0 ? bannerProducts.length - 1 : prev - 1
      );
    }
  };

  return (
    <>
      <Nav/>

      {/* Banner Section */}
      <section className="banner_part">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="banner_slider owl-carousel">
                {bannerProducts?.map((product, index) => (
                  <div 
                    key={product.id}
                    className={`single_banner_slider ${index === currentSlide ? 'active' : ''}`}
                    style={{ display: index === currentSlide ? 'block' : 'none' }}
                  >
                    <div className="row">
                      <div className="col-lg-5 col-md-8">
                        <div className="banner_text">
                          <div className="banner_text_iner">
                            <h1>{product.nom}</h1>
                            <p>{product.description}</p>
                            <a href="#" className="btn_2">buy now</a>
                          </div>
                        </div>
                      </div>
                      <div className="banner_img d-none d-lg-block">
                        <img src={getImageUrl(product.image1)} alt={product.nom} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="slider-counter">
                <button onClick={prevSlide}>←</button>
                <span>{currentSlide + 1} / {bannerProducts?.length || 0}</span>
                <button onClick={nextSlide}>→</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="feature_part padding_top">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="section_tittle text-center">
                <h2>Featured Category</h2>
              </div>
            </div>
          </div>
          <div className="row align-items-center justify-content-between">
            {featuredProducts?.map((product, index) => (
              <div 
                key={product.id}
                className={index % 2 === 0 ? "col-lg-7 col-sm-6" : "col-lg-5 col-sm-6"}
              >
                <div className="single_feature_post_text">
                  <p>Premium Quality</p>
                  <h3>{product.nom}</h3>
                  <a href="#" className="feature_btn">
                    EXPLORE NOW <i className="fas fa-play"></i>
                  </a>
                  <img src={getImageUrl(product.image1)} alt={product.nom} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product List Section */}
      <section className="product_list section_padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div className="section_tittle text-center">
                <h2>awesome <span>shop</span></h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="product_list_slider owl-carousel">
                <div className="single_product_list_slider">
                  <div className="row align-items-center justify-content-between">
                    {shopProducts?.map((product) => (
                      <div key={product.id} className="col-lg-3 col-sm-6">
                        <div className="single_product_item">
                          <img src={getImageUrl(product.image1)} alt={product.nom} />
                          <div className="single_product_text">
                            <h4>{product.nom}</h4>
                            <h3>${product.prix}</h3>
                            <a href="#" className="add_cart">
                              + add to cart<i className="ti-heart"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Offer Section */}
      {offerProduct && (
        <section className="our_offer section_padding">
          <div className="container">
            <div className="row align-items-center justify-content-between">
              <div className="col-lg-6 col-md-6">
                <div className="offer_img">
                  <img src={getImageUrl(offerProduct.image1)} alt="offer" />
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="offer_text">
                  <h2>Weekly Sale on 60% Off All Products</h2>
                  <div className="date_countdown">
                    <div id="timer">
                      <div id="days" className="date"></div>
                      <div id="hours" className="date"></div>
                      <div id="minutes" className="date"></div>
                      <div id="seconds" className="date"></div>
                    </div>
                  </div>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="enter email address"
                    />
                    <div className="input-group-append">
                      <a href="#" className="input-group-text btn_2">
                        book now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Best Sellers Section */}
      <section className="product_list best_seller section_padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div className="section_tittle text-center">
                <h2>Best Sellers <span>shop</span></h2>
              </div>
            </div>
          </div>
          <div className="row align-items-center justify-content-between">
            <div className="col-lg-12">
              <div className="best_product_slider owl-carousel">
                {bestSellers?.map((product) => (
                  <div key={product.id} className="single_product_item">
                    <img src={getImageUrl(product.image1)} alt={product.nom} />
                    <div className="single_product_text">
                      <h4>{product.nom}</h4>
                      <h3>${product.prix}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="subscribe_area section_padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7">
              <div className="subscribe_area_text text-center">
                <h5>Join Our Newsletter</h5>
                <h2>Subscribe to get Updated with new offers</h2>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter email address"
                  />
                  <div className="input-group-append">
                    <a href="#" className="input-group-text btn_2">
                      subscribe now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Logo Section */}
      <section className="client_logo padding_top">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              {[1, 2, 3, 4, 5, 3, 1, 2, 3, 4].map((num, index) => (
                <div key={index} className="single_client_logo">
                  <img src={`/img/client_logo/client_logo_${num}.png`} alt="client logo" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;