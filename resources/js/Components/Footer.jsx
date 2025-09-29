import React from "react";
import { FaFacebookF, FaTwitter, FaGlobe, FaBehance } from "react-icons/fa";
import '../../css/footer.css';
import { Link } from "@inertiajs/react";


export default function Footer(){
  return(
    <>
    <footer className="footer">
      <div className="footer-container">
        {/* Colonne 1 */}
        <div className="footer-col">
          <h4>Top Products</h4>
          <ul>
            <li>Managed Website</li>
            <li>Manage Reputation</li>
            <li>Power Tools</li>
            <li>Marketing Service</li>
          </ul>
        </div>

        {/* Colonne 2 */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li>Jobs</li>
            <li>Brand Assets</li>
            <li>Investor Relations</li>
            <li>Terms of Service</li>
          </ul>
        </div>

        {/* Colonne 3 */}
        <div className="footer-col">
          <h4>Features</h4>
          <ul>
            <li>Jobs</li>
            <li>Brand Assets</li>
            <li>Investor Relations</li>
            <li>Terms of Service</li>
          </ul>
        </div>

        {/* Colonne 4 */}
        <div className="footer-col">
          <h4>Resources</h4>
          <ul>
            <li>Guides</li>
            <li>Research</li>
            <li>Experts</li>
            <li>Agencies</li>
          </ul>
        </div>

        {/* Colonne Newsletter */}
        <div className="footer-col newsletter">
          <h4>Newsletter</h4>
          <p>
            Heaven fruitful doesn&apos;t over lesser in days.
            <br /> Appear creeping
          </p>
          <div className="newsletter-box">
            <input type="email" placeholder="Email Address" />
            <button>Subscribe</button>
          </div>
        </div>
      </div>

      {/* Bas du footer */}
      <div className="footer-bottom">
        <p>
          Copyright ©2025 All rights reserved | This template is made with ♡ by Arthur
        </p>
        <div className="social-icons">
          <a href="#"><FaFacebookF /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaGlobe /></a>
          <a href="#"><FaBehance /></a>
        </div>
      </div>
    </footer>
    </>
  )
}