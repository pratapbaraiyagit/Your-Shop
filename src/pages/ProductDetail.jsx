import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Badge, Tab, Tabs } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiShoppingCart,
  FiHeart,
  FiMinus,
  FiPlus,
  FiTruck,
  FiShield,
  FiRefreshCw,
} from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";
import AOS from "aos";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });

    // Find product from data
    const foundProduct = products.find((p) => p.id === parseInt(id));

    if (foundProduct) {
      // Add multiple images for gallery
      const productWithImages = {
        ...foundProduct,
        images: [
          foundProduct.image,
          foundProduct.image.replace("w=500", "w=600"),
          foundProduct.image.replace("w=500", "w=700"),
        ],
        features: [
          "Premium Quality Materials",
          "Fast Shipping Available",
          "30-Day Return Policy",
          "Customer Support Included",
          "Warranty Protection",
          "Satisfaction Guaranteed",
        ],
        specifications: {
          Brand: "Your Shop",
          Model: `SV-${foundProduct.id}`,
          Category: foundProduct.category,
          Rating: `${foundProduct.rating}/5`,
          Reviews: foundProduct.reviews,
          Availability: foundProduct.inStock ? "In Stock" : "Out of Stock",
        },
      };
      setProduct(productWithImages);
    }

    setLoading(false);
  }, [id]);

  const handleQuantityChange = (action) => {
    if (action === "increase" && quantity < 10) {
      setQuantity(quantity + 1);
    } else if (action === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    // Show success message or animation
    alert(`Added ${quantity} ${product.name}(s) to cart!`);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="star filled">
          ★
        </span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="star half">
          ★
        </span>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="star">
          ★
        </span>
      );
    }

    return stars;
  };

  if (loading) {
    return (
      <div className="product-detail-page">
        <Container className="py-5">
          <div className="loading-state text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-page">
        <Container className="py-5">
          <div className="text-center">
            <h3>Product not found</h3>
            <Button
              onClick={() => navigate("/products")}
              className="btn-primary-gradient"
            >
              Back to Products
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <Container className="py-5">
        <Row>
          {/* Product Images */}
          <Col lg={6} className="mb-4">
            <div className="product-gallery" data-aos="fade-right">
              <div className="main-image-container">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="main-image"
                />
                {product.originalPrice > product.price && (
                  <Badge bg="danger" className="discount-badge">
                    {Math.round(
                      (1 - product.price / product.originalPrice) * 100
                    )}
                    % OFF
                  </Badge>
                )}
              </div>
              <div className="thumbnail-container">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className={`thumbnail ${
                      selectedImage === index ? "active" : ""
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>
          </Col>

          {/* Product Info */}
          <Col lg={6}>
            <div className="product-info" data-aos="fade-left">
              <div className="product-category text-primary mb-2">
                {product.category}
              </div>

              <h1 className="product-title">{product.name}</h1>

              <div className="product-rating mb-3">
                <div className="stars">{renderStars(product.rating)}</div>
                <span className="rating-text">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              <div className="product-price mb-4">
                <span className="current-price">${product.price}</span>
                {product.originalPrice &&
                  product.originalPrice > product.price && (
                    <span className="original-price">
                      ${product.originalPrice}
                    </span>
                  )}
              </div>

              <p className="product-description">{product.description}</p>

              <div className="product-features mb-4">
                <h6 className="features-title">Key Features:</h6>
                <ul className="features-list">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="product-stock mb-4">
                {product.inStock ? (
                  <div className="in-stock">
                    <Badge bg="success" className="stock-badge">
                      In Stock
                    </Badge>
                    <span className="stock-count">Ready to ship</span>
                  </div>
                ) : (
                  <Badge bg="danger" className="stock-badge">
                    Out of Stock
                  </Badge>
                )}
              </div>

              <div className="product-actions">
                <div className="quantity-selector mb-3">
                  <label className="quantity-label">Quantity:</label>
                  <div className="quantity-controls">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => handleQuantityChange("decrease")}
                      disabled={quantity <= 1}
                    >
                      <FiMinus />
                    </Button>
                    <span className="quantity-display">{quantity}</span>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => handleQuantityChange("increase")}
                      disabled={quantity >= 10}
                    >
                      <FiPlus />
                    </Button>
                  </div>
                </div>

                <div className="action-buttons">
                  <Button
                    className="btn-primary-gradient add-to-cart-btn"
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                  >
                    <FiShoppingCart className="me-2" />
                    Add to Cart
                  </Button>
                  <Button variant="outline-secondary" className="wishlist-btn">
                    <FiHeart />
                  </Button>
                </div>
              </div>

              <div className="product-guarantees mt-4">
                <div className="guarantee-item">
                  <FiTruck className="guarantee-icon" />
                  <span>Free shipping on orders over $50</span>
                </div>
                <div className="guarantee-item">
                  <FiShield className="guarantee-icon" />
                  <span>2-year warranty included</span>
                </div>
                <div className="guarantee-item">
                  <FiRefreshCw className="guarantee-icon" />
                  <span>30-day return policy</span>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        {/* Product Details Tabs */}
        <Row className="mt-5">
          <Col>
            <div className="product-tabs" data-aos="fade-up">
              <Tabs defaultActiveKey="specifications" className="mb-4">
                <Tab eventKey="specifications" title="Specifications">
                  <div className="specifications-content">
                    <Row>
                      {Object.entries(product.specifications).map(
                        ([key, value]) => (
                          <Col md={6} key={key} className="mb-3">
                            <div className="spec-item">
                              <strong>{key}:</strong> {value}
                            </div>
                          </Col>
                        )
                      )}
                    </Row>
                  </div>
                </Tab>

                <Tab eventKey="reviews" title={`Reviews (${product.reviews})`}>
                  <div className="reviews-content">
                    <h6>Customer Reviews</h6>
                    <p className="text-muted">
                      This product has received {product.reviews} reviews with
                      an average rating of {product.rating} stars. Customer
                      reviews help other shoppers make informed decisions about
                      their purchases.
                    </p>
                    <div className="review-summary">
                      <div className="stars mb-2">
                        {renderStars(product.rating)}
                        <span className="ms-2">
                          {product.rating} out of 5 stars
                        </span>
                      </div>
                      <p>Based on {product.reviews} customer reviews</p>
                    </div>
                  </div>
                </Tab>

                <Tab eventKey="shipping" title="Shipping & Returns">
                  <div className="shipping-content">
                    <h6>Shipping Information</h6>
                    <ul>
                      <li>Free shipping on orders over $50</li>
                      <li>Standard delivery: 3-5 business days</li>
                      <li>
                        Express delivery: 1-2 business days (additional charge)
                      </li>
                      <li>International shipping available</li>
                    </ul>

                    <h6 className="mt-4">Return Policy</h6>
                    <ul>
                      <li>30-day return window</li>
                      <li>Items must be in original condition</li>
                      <li>Free returns for defective items</li>
                      <li>Return shipping costs may apply</li>
                    </ul>
                  </div>
                </Tab>
              </Tabs>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductDetail;
