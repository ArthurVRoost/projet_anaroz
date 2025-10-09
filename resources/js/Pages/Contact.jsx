import Nav from '@/Components/Nav'
import Footer from '@/Components/Footer'
import '../../css/contact.css'
import { IoLocationSharp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { useForm, usePage } from '@inertiajs/react';

export default function Contact({ bannerImage }) {
  // ✅ Hook useForm pour gérer les données du formulaire
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const { flash } = usePage().props; // pour les messages de succès Laravel (avec ->with())

  // ✅ Fonction de soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('contact.send'), {
      onSuccess: () => reset(), // vide les champs après succès
    });
  };

  return (
    <div>
      <Nav />

      {/* Bandeau haut */}
      <div className="carouDetails">
        <div className="div1details" style={{ marginLeft: '15%' }}>
          <h2 className="detailsH1">Contact Us</h2>
          <p className="detailsP">Home - Contact us</p>
        </div>
        <div className="div2details">
          <img className="detailsCarouImg" src={bannerImage} alt="" />
        </div>
      </div>

      {/* Conteneur principal */}
      <div className="contact-container">
        {/* Carte Google Maps */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2613.79422420027!2d4.3387872765001445!3d50.855470258119205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3c38e84af80dd%3A0xe85cd9cd0218a4aa!2sPl.%20de%20la%20Minoterie%2010%2C%201080%20Molenbeek-Saint-Jean!5e1!3m2!1sfr!2sbe!4v1759241554052!5m2!1sfr!2sbe"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Formulaire + infos */}
        <div className="contact-form-wrapper">

          {/* ✅ Formulaire de contact connecté au back */}
          <div className="contact-form">
            <h3>Get in Touch</h3>

            {/* Message de succès */}
            {flash?.success && (
              <p style={{ color: 'green', marginBottom: '10px' }}>{flash.success}</p>
            )}

            <form onSubmit={handleSubmit}>
              <textarea
                placeholder="Enter Message"
                value={data.message}
                onChange={(e) => setData('message', e.target.value)}
              ></textarea>
              {errors.message && <p style={{ color: 'red' }}>{errors.message}</p>}

              <div className="form-row">
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                />
                {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}

                <input
                  type="email"
                  placeholder="Enter email address"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                />
                {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
              </div>

              <input
                type="text"
                placeholder="Enter Subject"
                value={data.subject}
                onChange={(e) => setData('subject', e.target.value)}
              />
              {errors.subject && <p style={{ color: 'red' }}>{errors.subject}</p>}

              <button className="btn-send" disabled={processing}>
                {processing ? 'Sending...' : 'SEND MESSAGE'}
              </button>
            </form>
          </div>

          {/* Informations de contact */}
          <div className="contact-info">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span><IoLocationSharp /></span>
              <p><strong>Place de la Minoterie, Molenbeek</strong><br />Bruxelles, BE 1080</p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span><FaPhoneAlt /></span>
              <p><strong>0477 88 99 00</strong><br />Mon to Fri 9am to 6pm</p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span><IoMdMail /></span>
              <p><strong>mouss@mouss.be</strong><br />Send us your query anytime!</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}