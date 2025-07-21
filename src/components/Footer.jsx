import { Container, Row, Col } from "react-bootstrap";
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiMail,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import "./Footer.css";
import YourLogo from "../assets/your_shop_logo.png"; // **Adjust the path to your logo image**

const Footer = () => {
  return (
    <footer className="custom-footer">
      <Container>
        <Row>
          <Col lg={4} md={6} className="mb-4">
            <div className="footer-brand">
              <img
                src={YourLogo}
                alt="Your Shop Logo"
                className="brand-text"
                style={{ width: "120px", height: "auto" }} // Set width, let height adjust
              />
              <p>
                Your ultimate destination for premium products and exceptional
                shopping experience.
              </p>
              <div className="social-links">
                <a href="#" className="social-link">
                  <FiFacebook size={20} />
                </a>
                <a href="#" className="social-link">
                  <FiTwitter size={20} />
                </a>
                <a href="#" className="social-link">
                  <FiInstagram size={20} />
                </a>
              </div>
            </div>
          </Col>

          <Col lg={2} md={6} className="mb-4">
            <h6 className="footer-title">Quick Links</h6>
            <ul className="footer-links">
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/auth">Account</Link>
              </li>
            </ul>
          </Col>

          <Col lg={3} md={6} className="mb-4">
            <h6 className="footer-title">Categories</h6>
            <ul className="footer-links">
              <li>
                <a href="#">Electronics</a>
              </li>
              <li>
                <a href="#">Fashion</a>
              </li>
              <li>
                <a href="#">Home & Living</a>
              </li>
              <li>
                <a href="#">Sports</a>
              </li>
            </ul>
          </Col>

          <Col lg={3} md={6} className="mb-4">
            <h6 className="footer-title">Contact Info</h6>
            <div className="contact-info">
              <div className="contact-item">
                <FiMapPin size={16} />
                <span>123 Shopping St, City, State 12345</span>
              </div>
              <div className="contact-item">
                <FiPhone size={16} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="contact-item">
                <FiMail size={16} />
                <span>info@yourshop.com</span>
              </div>
            </div>
          </Col>
        </Row>

        <hr className="footer-divider" />

        <Row>
          <Col md={6}>
            <p className="footer-copyright">
              © 2024 Your Shop. All rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-md-end">
            <p className="footer-legal">
              <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
