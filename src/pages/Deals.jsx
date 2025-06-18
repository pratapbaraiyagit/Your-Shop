import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiClock } from 'react-icons/fi';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import AOS from 'aos';

const Deals = () => {
  const [dealProducts, setDealProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });

    // Filter products that have original price (on sale)
    const onSaleProducts = products.filter(product => product.originalPrice && product.originalPrice > product.price);
    setDealProducts(onSaleProducts);
  }, []);

  const calculateDiscount = (originalPrice, currentPrice) => {
    return Math.round((1 - currentPrice / originalPrice) * 100);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', background: '#f8f9fa' }}>
      <Container className="py-5">
        {/* Hero Section */}
        <Row className="mb-5">
          <Col>
            <div 
              className="text-center p-5 rounded-4"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white'
              }}
              data-aos="fade-up"
            >
              <h1 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '1rem' }}>
                🔥 Hot Deals & Offers
              </h1>
              <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: '0.9' }}>
                Save big on your favorite products! Limited time offers you don't want to miss.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
                <FiClock size={24} />
                <span style={{ fontSize: '1.1rem', fontWeight: '600' }}>
                  Deals refresh daily - Shop now!
                </span>
              </div>
            </div>
          </Col>
        </Row>

        {/* Deals Grid */}
        <Row>
          <Col>
            <div className="mb-4" data-aos="fade-up">
              <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#2d3748', marginBottom: '0.5rem' }}>
                Special Offers
              </h2>
              <p style={{ color: '#6c757d' }}>
                {dealProducts.length} products on sale with amazing discounts
              </p>
            </div>
          </Col>
        </Row>

        <Row>
          {dealProducts.map((product, index) => (
            <Col lg={4} md={6} key={product.id} className="mb-4">
              <Card 
                className="h-100 border-0 shadow-sm"
                style={{
                  borderRadius: '15px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease'
                }}
                data-aos="fade-up" 
                data-aos-delay={index * 100}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div style={{ position: 'relative', overflow: 'hidden', height: '250px' }}>
                  <Card.Img
                    variant="top"
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease'
                    }}
                  />
                  <Badge 
                    bg="danger" 
                    style={{
                      position: 'absolute',
                      top: '15px',
                      left: '15px',
                      fontSize: '0.9rem',
                      padding: '8px 15px',
                      borderRadius: '20px',
                      fontWeight: '600'
                    }}
                  >
                    {calculateDiscount(product.originalPrice, product.price)}% OFF
                  </Badge>
                  <Badge 
                    bg="success" 
                    style={{
                      position: 'absolute',
                      top: '15px',
                      right: '15px',
                      fontSize: '0.8rem',
                      padding: '5px 10px',
                      borderRadius: '15px'
                    }}
                  >
                    SALE
                  </Badge>
                </div>
                <Card.Body className="p-4 d-flex flex-column">
                  <div style={{ fontSize: '0.85rem', color: '#6366f1', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>
                    {product.category}
                  </div>
                  <h5 style={{ fontWeight: '600', color: '#2d3748', marginBottom: '1rem' }}>
                    <Link 
                      to={`/product/${product.id}`} 
                      style={{ color: '#2d3748', textDecoration: 'none' }}
                      onMouseEnter={(e) => e.target.style.color = '#6366f1'}
                      onMouseLeave={(e) => e.target.style.color = '#2d3748'}
                    >
                      {product.name}
                    </Link>
                  </h5>
                  
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '1.5rem', fontWeight: '700', color: '#6366f1' }}>
                        ${product.price}
                      </span>
                      <span style={{ fontSize: '1.1rem', color: '#6c757d', textDecoration: 'line-through' }}>
                        ${product.originalPrice}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#28a745', fontWeight: '600' }}>
                      You save ${(product.originalPrice - product.price).toFixed(2)}
                    </div>
                  </div>

                  <div style={{ marginTop: 'auto', display: 'flex', gap: '10px' }}>
                    <Button
                      as={Link}
                      to={`/product/${product.id}`}
                      variant="outline-primary"
                      style={{ flex: '1', borderRadius: '8px' }}
                    >
                      View Details
                    </Button>
                    <Button
                      onClick={() => handleAddToCart(product)}
                      style={{
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '8px 16px'
                      }}
                    >
                      <FiShoppingCart />
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {dealProducts.length === 0 && (
          <Row>
            <Col className="text-center py-5">
              <div data-aos="fade-up">
                <h4 style={{ color: '#6c757d' }}>No deals available at the moment</h4>
                <p style={{ color: '#6c757d' }}>Check back soon for amazing offers!</p>
                <Button 
                  as={Link} 
                  to="/products"
                  style={{
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    border: 'none',
                    padding: '12px 30px',
                    borderRadius: '25px',
                    fontWeight: '600'
                  }}
                >
                  Browse All Products
                </Button>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Deals;