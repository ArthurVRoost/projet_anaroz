import Carousel from "@/Components/Carousel";
import Nav from "@/Components/Nav";
import { Link, useForm, usePage } from "@inertiajs/react";
import "../../css/home.css";
import "../../css/awesome.css";
import { useEffect, useState } from "react";
import Footer from "@/Components/Footer";

export default function Home({
  bannerProducts,
  featuredProducts,
  shopProducts,
  offerProduct,
  categories,
  imageBaseUrl,
  awesomeProducts,
  bestSellers,
}) {
  const [startIndex, setStartIndex] = useState(0);
  const { data, setData, post, processing, reset, errors } = useForm({
    email: "",
  });
  const { flash } = usePage().props;

  // SLIDER "Awesome"
  const nextSlide = () => setStartIndex((prev) => (prev + 2) % awesomeProducts.length);
  const prevSlide = () => setStartIndex((prev) => (prev - 2 + awesomeProducts.length) % awesomeProducts.length);

  const visibleProducts = awesomeProducts
    .slice(startIndex, startIndex + 8)
    .concat(
      startIndex + 8 > awesomeProducts.length
        ? awesomeProducts.slice(0, (startIndex + 8) % awesomeProducts.length)
        : []
    );

  // COUNTDOWN
  const [targetDate, setTargetDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 5);
    return d;
  });
  const [timeLeft, setTimeLeft] = useState({ days: 5, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance <= 0) {
        const next = new Date();
        next.setTime(now + 5 * 24 * 60 * 60 * 1000);
        setTargetDate(next);
        setTimeLeft({ days: 5, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / (1000 * 60)) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const pad = (n) => String(n).padStart(2, "0");

  // ✅ Fonction d'envoi newsletter
  const handleSubscribe = (e) => {
    e.preventDefault();
    post(route("newsletter.subscribe"), {
      onSuccess: () => reset(),
    });
  };

  return (
    <>
      <Nav />
      <Carousel bannerProducts={bannerProducts} imageBaseUrl={imageBaseUrl} />

      {/* SECTION 1 : Featured Category */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-10">Featured Category</h2>

        <div className="featured-grid max-w-6xl mx-auto px-4 space-y-6">
          <div className="row flex gap-6">
            <div className="card group flex-1 basis-[55%]">
              <div className="card-content">
                <div className="text-section">
                  <h3 className="text-lg font-bold capitalize">
                    {featuredProducts[0].nom}
                  </h3>
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
                  <h3 className="text-lg font-bold capitalize">
                    {featuredProducts[1].nom}
                  </h3>
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
                  <h3 className="text-lg font-bold capitalize">
                    {featuredProducts[2].nom}
                  </h3>
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
                  <h3 className="text-lg font-bold capitalize">
                    {featuredProducts[3].nom}
                  </h3>
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

      {/* SECTION 2 : Awesome */}
      <section className="awesome-section">
        <div className="container">
          <div className="awesome-header">
            <div className="awesome-arthur">
              <h2 className="title">Awesome</h2>
              <span>Shop</span>
            </div>
            <div className="nav-buttons">
              <button onClick={prevSlide}>Prev</button>
              <span> | </span>
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

      {/* SECTION 3 : Weekly Sale */}
      <section className="weekly-sale">
        <div className="container">
          <div className="sale-content">
            <h2>Weekly Sale On 60% Off All Products</h2>

            <div className="countdown">
              <div><span>{pad(timeLeft.days)}</span>Days</div>
              <div><span>{pad(timeLeft.hours)}</span>Hrs</div>
              <div><span>{pad(timeLeft.minutes)}</span>Min</div>
              <div><span>{pad(timeLeft.seconds)}</span>Sec</div>
            </div>

            <form onSubmit={handleSubscribe} className="email-box">
              <input
                type="email"
                placeholder="Enter your email"
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
              />
              <button disabled={processing}>Book Now</button>
            </form>

            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
            {flash?.success && <p style={{ color: "green" }}>{flash.success}</p>}
          </div>
        </div>
      </section>

      {/* SECTION 4 : Best Sellers */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Best Sellers</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
            {bestSellers.map((produit) => (
              <div
                key={produit.id}
                className="group p-4 flex flex-col items-center justify-center rounded-lg shadow-sm hover:shadow-md transition"
              >
                <img
                  src={produit.image_url}
                  alt={produit.nom}
                  className="max-h-40 object-contain"
                />
                <h3 className="mt-4 font-bold text-center">{produit.nom}</h3>
                <p className="text-gray-600 text-center">
                  ${Number(produit.prix).toFixed(2)}
                </p>
                <a
                  href={route("details.show", produit.id)}
                  className="mt-2 opacity-0 group-hover:opacity-100 transition duration-300 text-pink-600 font-bold"
                >
                  EXPLORE NOW →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 : Newsletter */}
      <section className="section5" style={{ backgroundColor: "#F6F8FE" }}>
        <h3 className="section5H3">JOIN OUR NEWSLETTER</h3>
        <h1 className="section5H1">Subscribe to get Updated with new offers</h1>
        <form onSubmit={handleSubscribe} className="section5Div">
          <input
            placeholder="Enter Email Address"
            type="email"
            value={data.email}
            onChange={(e) => setData("email", e.target.value)}
          />
          <button className="section5Btn" disabled={processing}>
            SUBSCRIBE NOW
          </button>
        </form>

        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        {flash?.success && <p style={{ color: "green" }}>{flash.success}</p>}
      </section>

      <Footer />
    </>
  );
}