import { useState } from "react";
import { Navbar, Nav, Container, Badge, Dropdown } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiShoppingCart, FiUser, FiMenu, FiLogOut } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import "./Navbar.css";

const CustomNavbar = () => {
  const [expanded, setExpanded] = useState(false);
  const { currentUser, logout } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <Navbar
      bg="white"
      expand="lg"
      fixed="top"
      className="custom-navbar shadow-sm"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand-logo">
          <span className="brand-text">Your Shop</span>
        </Navbar.Brand>

        <div className="d-flex align-items-center order-lg-2">
          <Link to="/cart" className="cart-icon-link me-3">
            <div className="cart-icon-wrapper">
              <FiShoppingCart size={20} />
              {getTotalItems() > 0 && (
                <Badge bg="primary" className="cart-badge">
                  {getTotalItems()}
                </Badge>
              )}
            </div>
          </Link>

          {currentUser ? (
            <Dropdown align="end">
              <Dropdown.Toggle variant="light" className="user-dropdown">
                <FiUser size={20} />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/profile">
                  Profile
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/orders">
                  My Orders
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>
                  <FiLogOut size={16} className="me-2" />
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Link to="/auth" className="btn btn-primary btn-sm">
              Login
            </Link>
          )}

          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setExpanded(!expanded)}
            className="ms-2"
          >
            <FiMenu />
          </Navbar.Toggle>
        </div>

        <Navbar.Collapse id="basic-navbar-nav" in={expanded}>
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to="/"
              className={isActive("/") ? "active" : ""}
              onClick={() => setExpanded(false)}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/products"
              className={isActive("/products") ? "active" : ""}
              onClick={() => setExpanded(false)}
            >
              Products
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/categories"
              className={isActive("/categories") ? "active" : ""}
              onClick={() => setExpanded(false)}
            >
              Categories
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/deals"
              className={isActive("/deals") ? "active" : ""}
              onClick={() => setExpanded(false)}
            >
              Deals
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/about"
              className={isActive("/about") ? "active" : ""}
              onClick={() => setExpanded(false)}
            >
              About
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/contact"
              className={isActive("/contact") ? "active" : ""}
              onClick={() => setExpanded(false)}
            >
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
