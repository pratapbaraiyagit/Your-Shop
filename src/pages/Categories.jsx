import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { categories, products } from '../data/products';
import AOS from 'aos';

const Categories = () => {
  const [categoryStats, setCategoryStats] = useState([]);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });

    // Calculate product count for each category
    const stats = categories.slice(1).map(category => {
      const categoryProducts = products.filter(product => product.category === category);
      const sampleProduct = categoryProducts[0];
      
      return {
        name: category,
        count: categoryProducts.length,
        image: sampleProduct ? sampleProduct.image : 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=500',
        description: `Explore our ${category.toLowerCase()} collection`
      };
    });

    setCategoryStats(stats);
  }, []);

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <Container className="py-5">
        <Row>
          <Col>
            <div className="text-center mb-5" data-aos="fade-up">
              <h1 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#2d3748', marginBottom: '1rem' }}>
                Shop by Categories
              </h1>
              <p style={{ fontSize: '1.1rem', color: '#6c757d' }}>
                Browse our wide range of product categories
              </p>
            </div>
          </Col>
        </Row>

        <Row>
          {categoryStats.map((category, index) => (
            <Col lg={4} md={6} key={category.name} className="mb-4">
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
                <div style={{ position: 'relative', overflow: 'hidden', height: '200px' }}>
                  <Card.Img
                    variant="top"
                    src={category.image}
                    alt={category.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'scale(1)';
                    }}
                  />
                  <div 
                    style={{
                      position: 'absolute',
                      top: '15px',
                      right: '15px',
                      background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                      color: 'white',
                      padding: '5px 12px',
                      borderRadius: '15px',
                      fontSize: '0.8rem',
                      fontWeight: '600'
                    }}
                  >
                    {category.count} Products
                  </div>
                </div>
                <Card.Body className="p-4">
                  <h5 style={{ fontWeight: '600', color: '#2d3748', marginBottom: '0.5rem' }}>
                    {category.name}
                  </h5>
                  <p style={{ color: '#6c757d', marginBottom: '1rem' }}>
                    {category.description}
                  </p>
                  <Button
                    as={Link}
                    to={`/products?category=${category.name}`}
                    style={{
                      background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                      border: 'none',
                      padding: '8px 20px',
                      borderRadius: '25px',
                      fontWeight: '600',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 5px 15px rgba(99, 102, 241, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    Browse {category.name}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Categories;