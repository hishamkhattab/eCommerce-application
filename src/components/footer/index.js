import React from "react";

import "./style.scss";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="logo-container">
          <img src="/assets/Babylon-logos_transparent.png" alt="logo" />
        </div>

        <div className="links-container">
          <div className="link">
            <h5>Quick Links</h5>
            <p>Shipping + Returns</p>
            <p>FAQs</p>
            <p>Contact Us</p>
            <p>Gift Cards</p>
            <p>Privacy Policy</p>
            <p>Terms of Service</p>
            <p>Refund Policy</p>
          </div>
          <div className="link">
            <h5>ABOUT US</h5>
            <p>Our Story + Mission</p>
            <p>Locations</p>
            <p>Collaborations</p>
            <p>Careers</p>
          </div>
          <div className="link">
            <h5>SIGN UP AND SAVE</h5>
            <p>Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
          </div>
        </div>
        <span className="copywright">© 2022 Babylon</span>
      </div>
    </div>
  );
}

export default Footer;
