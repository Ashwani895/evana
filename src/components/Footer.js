import React from 'react';
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-3">
      <div className="container">
        <div className="row">

          {/* Column 1 */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Evana</h5>
            <p>Connecting clients with trusted event management companies seamlessly.</p>
          </div>

          {/* Column 2 */}
          <div className="col-md-4 mb-4">
            <h6 className="fw-bold">Quick Links</h6>
            <ul className="list-unstyled">
  <li>
    <Link to="/" className="text-light text-decoration-none">
      Home
    </Link>
  </li>
  <li>
    <Link to="/how-it-works" className="text-light text-decoration-none">
      How it Works
    </Link>
  </li>
  <li>
    <Link to="/features" className="text-light text-decoration-none">
      Features
    </Link>
  </li>
  <li>
    <Link to="/support" className="text-light text-decoration-none">
      Support
    </Link>
  </li>
</ul>
          </div>

          {/* Column 3 */}
          <div className="col-md-4 mb-4">
            <h6 className="fw-bold">Contact Us</h6>
            <p>Email: support@evana.com</p>
            <p>Phone: +91 98765 43210</p>
            <div>
  <a
    href="https://facebook.com"
    target="_blank"
    rel="noopener noreferrer"
    className="text-light me-3"
  >
    <i className="bi bi-facebook"></i>
  </a>

  <a
    href="https://instagram.com"
    target="_blank"
    rel="noopener noreferrer"
    className="text-light me-3"
  >
    <i className="bi bi-instagram"></i>
  </a>

  <a
    href="https://twitter.com"
    target="_blank"
    rel="noopener noreferrer"
    className="text-light"
  >
    <i className="bi bi-twitter-x"></i>
  </a>
</div>
          </div>

        </div>

        <hr className="border-light" />

        <div className="text-center">
          <small>&copy; {new Date().getFullYear()} Evana. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
