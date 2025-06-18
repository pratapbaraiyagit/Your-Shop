import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiSearch, FiFilter } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { products, categories } from '../data/products';
import AOS from 'aos';
import './Products.css';

const Products = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const { addToCart } = useCart();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });

    setFilteredProducts(products);
  }, []);

  useEffect(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return b.id - a.id;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, sortBy]);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star filled">★</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star">★</span>);
    }

    return stars;
  };

  return (
    <div className="products-page">
      <Container className="py-5">
        {/* Page Header */}
        <Row className="mb-5">
          <Col>
            <div className="page-header text-center" data-aos="fade-up">
              <h1 className="page-title">Our Products</h1>
              <p className="page-subtitle text-muted">
                Discover our amazing collection of {products.length} premium products
              </p>
            </div>
          </Col>
        </Row>

        {/* Filters and Search */}
        <Row className="mb-4">
          <Col lg={4} md={6} className="mb-3">
            <div className="search-box" data-aos="fade-right">
              <FiSearch className="search-icon" />
              <Form.Control
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </Col>
          <Col lg={3} md={6} className="mb-3">
            <Form.Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
              data-aos="fade-up"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'All' ? 'All Categories' : category}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col lg={3} md={6} className="mb-3">
            <Form.Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
              data-aos="fade-left"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest First</option>
            </Form.Select>
          </Col>
          <Col lg={2} md={6} className="mb-3">
            <div className="results-count" data-aos="fade-left">
              <span className="text-muted">
                {filteredProducts.length} Products
              </span>
            </div>
          </Col>
        </Row>

        {/* Products Grid */}
        <Row>
          {filteredProducts.map((product, index) => (
            <Col lg={3} md={6} key={product.id} className="mb-4">
              <Card 
                className="product-card h-100" 
                data-aos="fade-up" 
                data-aos-delay={index * 50}
              >
                <div className="product-image-container">
                  <Card.Img
                    variant="top"
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                  <div className="product-badges">
                    {!product.inStock && (
                      <Badge bg="danger" className="stock-badge">
                        Out of Stock
                      </Badge>
                    )}
                    {product.originalPrice && (
                      <Badge bg="success" className="stock-badge ms-1">
                        Sale
                      </Badge>
                    )}
                  </div>
                  <div className="product-actions">
                    <Button 
                      variant="light" 
                      className="action-btn wishlist-btn"
                      title="Add to Wishlist"
                    >
                      <FiHeart />
                    </Button>
                    <Button
                      variant="primary"
                      className="action-btn cart-btn"
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.inStock}
                      title="Add to Cart"
                    >
                      <FiShoppingCart />
                    </Button>
                  </div>
                </div>
                <Card.Body className="p-3 d-flex flex-column">
                  <div className="product-category text-primary small mb-1">
                    {product.category}
                  </div>
                  <Card.Title className="product-name">
                    <Link to={`/product/${product.id}`} className="product-link">
                      {product.name}
                    </Link>
                  </Card.Title>
                  <div className="product-rating mb-2">
                    <div className="stars">
                      {renderStars(product.rating)}
                    </div>
                    <span className="rating-text text-muted small">
                      ({product.reviews} reviews)
                    </span>
                  </div>
                  <div className="product-price mt-auto">
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

        {filteredProducts.length === 0 && (
          <Row>
            <Col className="text-center py-5">
              <div className="no-products" data-aos="fade-up">
                <FiFilter size={64} className="text-muted mb-3" />
                <h4 className="text-muted">No products found</h4>
                <p className="text-muted">Try adjusting your search or filter criteria</p>
                <Button 
                  variant="primary" 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Products;