import { Link } from "react-router-dom";

const MARKETPLACE_NAME =
  process.env.REACT_APP_MARKETPLACE_NAME ||
  "Marketplace";

const SUPPORT_PHONE =
  process.env.REACT_APP_SUPPORT_PHONE || "";

const SUPPORT_EMAIL =
  process.env.REACT_APP_SUPPORT_EMAIL || "";

export default function Footer() {
  const whatsappNumber =
    SUPPORT_PHONE.replace(/\D/g, "");

  return (
    <footer>
      <div className="footer-content">

        <section
          id="about"
          className="footer-column"
          aria-labelledby="footer-about-heading"
        >
          <h3 id="footer-about-heading">
            About {MARKETPLACE_NAME}
          </h3>

          <p>
            Shop products from trusted sellers
            and receive them at your selected
            delivery location.
          </p>

          <Link to="/#about">
            About Us
          </Link>

          <Link to="/#about">
            How It Works
          </Link>
        </section>

        <nav
          className="footer-column"
          aria-labelledby="footer-marketplace-heading"
        >
          <h3 id="footer-marketplace-heading">
            Marketplace
          </h3>

          <Link to="/">
            Home
          </Link>

          <Link to="/categories">
            Explore
          </Link>

          <Link to="/#categories">
            Categories
          </Link>

          <Link to="/promotions">
            Promotions
          </Link>

          <Link to="/#new-arrivals">
            New Arrivals
          </Link>

          <Link to="/#bestsellers">
            Bestsellers
          </Link>
        </nav>

        <section
          className="footer-column"
          aria-labelledby="footer-contact-heading"
        >
          <h3 id="footer-contact-heading">
            Contact
          </h3>

          <p>
            Banjul, The Gambia
          </p>

          <p>
            {SUPPORT_PHONE}
          </p>

          {whatsappNumber && (
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
          )}

          {SUPPORT_EMAIL && (
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
            >
              {SUPPORT_EMAIL}
            </a>
          )}

          <a
            href="https://www.google.com/maps/search/?api=1&query=Banjul%2C%20The%20Gambia"
            target="_blank"
            rel="noreferrer"
          >
            Directions
          </a>
        </section>

      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()}{" "}
          {MARKETPLACE_NAME}. All rights reserved.
        </p>

        <div className="footer-bottom-links">
          <Link to="/#about">
            Terms &amp; Conditions
          </Link>

          <Link to="/#about">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}