import { Container, Row, Col, Card, Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useEffect } from 'react';
import AOS from 'aos';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  const handleQuantityChange = (productId, currentQuantity, action) => {
    const newQuantity = action === 'increase' ? currentQuantity + 1 : currentQuantity - 1;
    updateQuantity(productId, newQuantity);
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <Container className="py-5">
          <div className="empty-cart text-center" data-aos="fade-up">
            <FiShoppingBag size={80} className="text-muted mb-4" />
            <h2 className="text-muted mb-3">Your Cart is Empty</h2>
            <p className="text-muted mb-4">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Button as={Link} to="/products" className="btn-primary-gradient">
              Start Shopping
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <Container className="py-5">
        <Row>
          <Col>
            <div className="page-header mb-4" data-aos="fade-up">
              <h1 className="page-title">Shopping Cart</h1>
              <p className="text-muted">
                {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
          </Col>
        </Row>

        <Row>
          <Col lg={8}>
            <Card className="cart-items-card" data-aos="fade-right">
              <Card.Body className="p-0">
                <div className="table-responsive">
                  <Table className="cart-table mb-0">
                    <thead className="table-header">
                      <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item, index) => (
                        <tr key={`${item.id}-${index}`} className="cart-item-row">
                          <td>
                            <div className="product-info">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="product-image"
                              />
                              <div className="product-details">
                                <h6 className="product-name">{item.name}</h6>
                                <p className="product-category text-muted">
                                  {item.category}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="product-price">${item.price}</span>
                          </td>
                          <td>
                            <div className="quantity-controls">
                              <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={() => handleQuantityChange(item.id, item.quantity, 'decrease')}
                                disabled={item.quantity <= 1}
                                className="quantity-btn"
                              >
                                <FiMinus />
                              </Button>
                              <span className="quantity-display">{item.quantity}</span>
                              <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={() => handleQuantityChange(item.id, item.quantity, 'increase')}
                                className="quantity-btn"
                              >
                                <FiPlus />
                              </Button>
                            </div>
                          </td>
                          <td>
                            <span className="item-total">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </td>
                          <td>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => removeFromCart(item.id)}
                              className="remove-btn"
                              title="Remove item"
                            >
                              <FiTrash2 />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>

            <div className="cart-actions mt-3" data-aos="fade-right" data-aos-delay="200">
              <Button as={Link} to="/products" variant="outline-primary">
                Continue Shopping
              </Button>
            </div>
          </Col>

          <Col lg={4}>
            <Card className="order-summary-card" data-aos="fade-left">
              <Card.Header>
                <h5 className="mb-0">Order Summary</h5>
              </Card.Header>
              <Card.Body>
                <div className="summary-row">
                  <span>Subtotal ({getTotalItems()} items)</span>
                  <span className="amount">${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span className="amount">
                    {getTotalPrice() >= 50 ? 'FREE' : '$9.99'}
                  </span>
                </div>
                <div className="summary-row">
                  <span>Tax</span>
                  <span className="amount">${(getTotalPrice() * 0.08).toFixed(2)}</span>
                </div>
                <hr />
                <div className="summary-row total-row">
                  <span>Total</span>
                  <span className="amount">
                    ${(getTotalPrice() + (getTotalPrice() >= 50 ? 0 : 9.99) + (getTotalPrice() * 0.08)).toFixed(2)}
                  </span>
                </div>
                
                {getTotalPrice() < 50 && (
                  <div className="shipping-notice">
                    <small className="text-muted">
                      Add ${(50 - getTotalPrice()).toFixed(2)} more for FREE shipping!
                    </small>
                  </div>
                )}

                <Button 
                  as={Link} 
                  to="/checkout" 
                  className="btn-primary-gradient checkout-btn w-100 mt-3"
                >
                  Proceed to Checkout
                </Button>
              </Card.Body>
            </Card>

            <Card className="payment-security mt-3" data-aos="fade-left" data-aos-delay="200">
              <Card.Body className="text-center">
                <div className="security-badges">
                  <div className="security-item">
                    <span className="security-text">🔒 Secure Checkout</span>
                  </div>
                  <div className="security-item">
                    <span className="security-text">💳 All Cards Accepted</span>
                  </div>
                  <div className="security-item">
                    <span className="security-text">🚚 Fast Delivery</span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Cart;