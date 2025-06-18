import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Tab, Tabs } from 'react-bootstrap';
import { FiUser, FiMail, FiLock, FiShoppingBag, FiSettings } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import './Profile.css';

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });

    if (!currentUser) {
      navigate('/auth');
      return;
    }

    // Initialize profile data
    setProfileData({
      name: currentUser.displayName || '',
      email: currentUser.email || '',
      phone: '',
      address: ''
    });
  }, [currentUser, navigate]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      // Here you would update the user profile
      // For now, just show a success message
      setMessage('Profile updated successfully!');
    } catch (error) {
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      setError('Failed to log out');
    }
  };

  // Mock order data
  const mockOrders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'Delivered',
      total: 299.99,
      items: 3
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      status: 'Shipped',
      total: 149.99,
      items: 2
    },
    {
      id: 'ORD-003',
      date: '2024-01-05',
      status: 'Processing',
      total: 79.99,
      items: 1
    }
  ];

  if (!currentUser) {
    return null;
  }

  return (
    <div className="profile-page">
      <Container className="py-5">
        <Row>
          <Col>
            <div className="page-header mb-4" data-aos="fade-up">
              <h1 className="page-title">My Account</h1>
              <p className="text-muted">Manage your account settings and view your orders</p>
            </div>
          </Col>
        </Row>

        <Row>
          <Col lg={8}>
            <Card className="profile-card" data-aos="fade-right">
              <Card.Body className="p-4">
                <Tabs defaultActiveKey="profile" className="profile-tabs mb-4">
                  <Tab eventKey="profile" title={<><FiUser className="me-2" />Profile</>}>
                    <div className="profile-content">
                      {error && <Alert variant="danger">{error}</Alert>}
                      {message && <Alert variant="success">{message}</Alert>}

                      <Form onSubmit={handleProfileUpdate}>
                        <Row>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Full Name</Form.Label>
                              <div className="input-group-custom">
                                <FiUser className="input-icon" />
                                <Form.Control
                                  type="text"
                                  value={profileData.name}
                                  onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                                  className="form-control-custom"
                                />
                              </div>
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Email Address</Form.Label>
                              <div className="input-group-custom">
                                <FiMail className="input-icon" />
                                <Form.Control
                                  type="email"
                                  value={profileData.email}
                                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                                  className="form-control-custom"
                                  disabled
                                />
                              </div>
                            </Form.Group>
                          </Col>
                        </Row>

                        <Row>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Phone Number</Form.Label>
                              <Form.Control
                                type="tel"
                                value={profileData.phone}
                                onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                                className="form-control-custom"
                                placeholder="Enter your phone number"
                              />
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Address</Form.Label>
                              <Form.Control
                                type="text"
                                value={profileData.address}
                                onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                                className="form-control-custom"
                                placeholder="Enter your address"
                              />
                            </Form.Group>
                          </Col>
                        </Row>

                        <div className="profile-actions">
                          <Button
                            type="submit"
                            className="btn-primary-gradient me-3"
                            disabled={loading}
                          >
                            {loading ? 'Updating...' : 'Update Profile'}
                          </Button>
                          <Button
                            variant="outline-danger"
                            onClick={handleLogout}
                          >
                            Logout
                          </Button>
                        </div>
                      </Form>
                    </div>
                  </Tab>

                  <Tab eventKey="orders" title={<><FiShoppingBag className="me-2" />Orders</>}>
                    <div className="orders-content">
                      <h5 className="mb-4">Order History</h5>
                      {mockOrders.length > 0 ? (
                        <div className="orders-list">
                          {mockOrders.map((order) => (
                            <div key={order.id} className="order-item">
                              <div className="order-header">
                                <div className="order-info">
                                  <h6 className="order-id">Order #{order.id}</h6>
                                  <p className="order-date text-muted">
                                    Placed on {new Date(order.date).toLocaleDateString()}
                                  </p>
                                </div>
                                <div className="order-status">
                                  <span className={`status-badge status-${order.status.toLowerCase()}`}>
                                    {order.status}
                                  </span>
                                </div>
                              </div>
                              <div className="order-details">
                                <div className="order-summary">
                                  <span className="item-count">{order.items} items</span>
                                  <span className="order-total">${order.total}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="no-orders text-center py-5">
                          <FiShoppingBag size={64} className="text-muted mb-3" />
                          <h5 className="text-muted">No orders yet</h5>
                          <p className="text-muted">When you place your first order, it will appear here</p>
                        </div>
                      )}
                    </div>
                  </Tab>

                  <Tab eventKey="settings" title={<><FiSettings className="me-2" />Settings</>}>
                    <div className="settings-content">
                      <h5 className="mb-4">Account Settings</h5>
                      
                      <div className="setting-item">
                        <div className="setting-info">
                          <h6>Email Notifications</h6>
                          <p className="text-muted">Receive updates about your orders and promotions</p>
                        </div>
                        <Form.Check
                          type="switch"
                          id="email-notifications"
                          defaultChecked
                        />
                      </div>

                      <div className="setting-item">
                        <div className="setting-info">
                          <h6>SMS Notifications</h6>
                          <p className="text-muted">Get text messages for important order updates</p>
                        </div>
                        <Form.Check
                          type="switch"
                          id="sms-notifications"
                        />
                      </div>

                      <div className="setting-item">
                        <div className="setting-info">
                          <h6>Marketing Communications</h6>
                          <p className="text-muted">Receive promotional offers and new product announcements</p>
                        </div>
                        <Form.Check
                          type="switch"
                          id="marketing-communications"
                          defaultChecked
                        />
                      </div>

                      <hr className="my-4" />

                      <div className="danger-zone">
                        <h6 className="text-danger mb-3">Danger Zone</h6>
                        <Button variant="outline-danger" size="sm">
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </Tab>
                </Tabs>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="account-summary-card" data-aos="fade-left">
              <Card.Body className="p-4">
                <div className="profile-avatar text-center mb-4">
                  <div className="avatar-circle">
                    <FiUser size={40} />
                  </div>
                  <h5 className="mt-3 mb-1">{currentUser.displayName || 'User'}</h5>
                  <p className="text-muted">{currentUser.email}</p>
                </div>

                <div className="account-stats">
                  <div className="stat-item">
                    <div className="stat-value">3</div>
                    <div className="stat-label">Total Orders</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">$529.97</div>
                    <div className="stat-label">Total Spent</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">Gold</div>
                    <div className="stat-label">Member Status</div>
                  </div>
                </div>
              </Card.Body>
            </Card>

            <Card className="quick-actions-card mt-4" data-aos="fade-left" data-aos-delay="200">
              <Card.Body className="p-4">
                <h6 className="mb-3">Quick Actions</h6>
                <div className="quick-actions">
                  <Button variant="outline-primary" className="w-100 mb-2">
                    <FiShoppingBag className="me-2" />
                    View All Orders
                  </Button>
                  <Button variant="outline-primary" className="w-100 mb-2">
                    <FiLock className="me-2" />
                    Change Password
                  </Button>
                  <Button variant="outline-primary" className="w-100">
                    <FiMail className="me-2" />
                    Contact Support
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;