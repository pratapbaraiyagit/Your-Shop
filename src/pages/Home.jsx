import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiShoppingBag, FiTruck, FiShield, FiHeadphones } from 'react-icons/fi';
import { useEffect } from 'react';
import { products } from '../data/products';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Home.css';

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  // Get featured products (first 6 products)
  const featuredProducts = products.slice(0, 6);

  const features = [
    {
      icon: <FiTruck size={40} />,
      title: 'Free Shipping',
      description: 'Free shipping on orders over $50'
    },
    {
      icon: <FiShield size={40} />,
      title: 'Secure Payment',
      description: '100% secure payment methods'
    },
    {
      icon: <FiHeadphones size={40} />,
      title: '24/7 Support',
      description: 'Round the clock customer support'
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container-fluid p-0">
          <Container>
            <Row className="align-items-center min-vh-100">
              <Col lg={6} data-aos="fade-right">
                <div className="hero-content">
                  <h1 className="hero-title text-white">
                    Discover Amazing Products
                  </h1>
                  <p className="hero-description text-white">
                    Shop the latest trends and discover unique products from top brands.
                    Quality guaranteed with fast shipping worldwide. Over {products.length} products available!
                  </p>
                  <div className="hero-buttons">
                    <Button as={Link} to="/products" className="btn-primary-gradient me-3">
                      <FiShoppingBag className="me-2" />
                      Shop Now
                    </Button>
                    <Button as={Link} to="/about" variant="outline-light">
                      Learn More
                    </Button>
                  </div>
                </div>
              </Col>
              <Col lg={6} data-aos="fade-left">
                <div className="hero-image">
                  <img
                    src="https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Shopping"
                    className="img-fluid rounded-4 shadow-lg"
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section py-5">
        <Container>
          <Row>
            {features.map((feature, index) => (
              <Col md={4} key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                <Card className="feature-card h-100 border-0 shadow-sm">
                  <Card.Body className="text-center p-4">
                    <div className="feature-icon mb-3">
                      {feature.icon}
                    </div>
                    <h5 className="feature-title">{feature.title}</h5>
                    <p className="feature-description text-muted">
                      {feature.description}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products-section py-5 bg-light">
        <Container>
          <Row>
            <Col>
              <div className="section-header text-center mb-5" data-aos="fade-up">
                <h2 className="section-title">Featured Products</h2>
                <p className="section-subtitle text-muted">
                  Discover our handpicked selection of premium products
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            {featuredProducts.map((product, index) => (
              <Col lg={4} md={6} key={product.id} className="mb-4" data-aos="fade-up" data-aos-delay={index * 100}>
                <Card className="product-card h-100 border-0 shadow-sm">
                  <div className="product-image-wrapper">
                    <Card.Img
                      variant="top"
                      src={product.image}
                      alt={product.name}
                      className="product-image"
                    style={{ height: '248px' } }
                    />
                    <div className="product-overlay">
                      <Button
                        as={Link}
                        to={`/product/${product.id}`}
                        className="btn-view-product"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                  <Card.Body className="p-4">
                    <div className="product-category text-primary small mb-2">
                      {product.category}
                    </div>
                    <h5 className="product-name">{product.name}</h5>
                    <div className="product-price">
                      <span className="price">${product.price}</span>
                      {product.originalPrice && (
                        <span className="original-price text-muted text-decoration-line-through ms-2">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <Row>
            <Col className="text-center">
              <Button as={Link} to="/products" className="btn-primary-gradient" data-aos="fade-up">
                View All {products.length} Products
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section py-5">
        <div className="container-fluid p-0">
          <Container>
            <Row>
              <Col lg={6} className="mx-auto text-center" data-aos="fade-up">
                <h2 className="text-white mb-3">Stay Updated</h2>
                <p className="text-white-50 mb-4">
                  Subscribe to our newsletter and get the latest updates on new products and exclusive offers.
                </p>
                <div className="newsletter-form">
                  <div className="input-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your email"
                    />
                    <Button className="btn-primary-gradient">
                      Subscribe
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    </div>
  );
};

export default Home;