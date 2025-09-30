import Nav from '@/Components/Nav'
import Footer from '@/Components/Footer'
import '../../css/contact.css'
import { IoLocationSharp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

export default function Contact({ bannerImage }) {
  return (
    <div>
      <Nav />
      <div className="carouDetails">
        <div className="div1details" style={{ marginLeft: '15%' }}>
          <h2 className="detailsH1">Contact Us</h2>
          <p className="detailsP">Home - Contact us</p>
        </div>
        <div className="div2details">
          <img className="detailsCarouImg" src={bannerImage} alt="" />
        </div>
      </div>

      {/* === Container global === */}
      <div className="contact-container">
        {/* Iframe */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2613.79422420027!2d4.3387872765001445!3d50.855470258119205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3c38e84af80dd%3A0xe85cd9cd0218a4aa!2sPl.%20de%20la%20Minoterie%2010%2C%201080%20Molenbeek-Saint-Jean!5e1!3m2!1sfr!2sbe!4v1759241554052!5m2!1sfr!2sbe"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Formulaire + Infos */}
        <div className="contact-form-wrapper">
          {/* Form */}
          <div className="contact-form">
            <h3>Get in Touch</h3>
            <textarea placeholder="Enter Message"></textarea>
            <div className="form-row">
              <input type="text" placeholder="Enter your name" />
              <input type="email" placeholder="Enter email address" />
            </div>
            <input type="text" placeholder="Enter Subject" />
            <button className="btn-send">SEND MESSAGE</button>
          </div>

          {/* Infos Contact */}
          <div className="contact-info">
            <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                <span><IoLocationSharp /></span>
                <p><strong> Place de la minoterie, Molenbeek.</strong><br />Bruxelles, BE 1080</p>
            </div>
            
            <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                <span><FaPhoneAlt /></span>
                <p><strong> 0477 88 99 00</strong><br />Mon to Fri 9am to 6pm</p>
            </div>
            
            <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                <span><IoMdMail /></span>
                <p><strong> mouss@mouss.be</strong><br />Send us your query anytime!</p>
            </div>
            
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}