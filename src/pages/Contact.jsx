import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend } from "react-icons/fi";
import AOS from "aos";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      setShowAlert(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // Hide alert after 5 seconds
      setTimeout(() => setShowAlert(false), 5000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: <FiMail size={24} />,
      title: "Email Us",
      details: "info@yourshop.com",
      description: "Send us an email anytime!",
    },
    {
      icon: <FiPhone size={24} />,
      title: "Call Us",
      details: "+1 (555) 123-4567",
      description: "Mon-Fri from 8am to 5pm",
    },
    {
      icon: <FiMapPin size={24} />,
      title: "Visit Us",
      details: "123 Shopping St, City, State 12345",
      description: "Come say hello at our office",
    },
    {
      icon: <FiClock size={24} />,
      title: "Working Hours",
      details: "Mon - Fri: 8am - 5pm",
      description: "Weekend support available",
    },
  ];

  const faqs = [
    {
      question: "How can I track my order?",
      answer:
        'You can track your order by logging into your account and visiting the "My Orders" section. You\'ll receive tracking information via email once your order ships.',
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for most items. Items must be in original condition with tags attached. Please visit our Returns page for detailed information.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location. You can see available options at checkout.",
    },
    {
      question: "How can I change or cancel my order?",
      answer:
        "Orders can be modified or cancelled within 1 hour of placement. After that, please contact our customer service team for assistance.",
    },
  ];

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <Container>
          <Row>
            <Col lg={8} className="mx-auto text-center" data-aos="fade-up">
              <h1 className="hero-title">Get In Touch</h1>
              <p className="hero-description">
                We'd love to hear from you. Send us a message and we'll respond
                as soon as possible.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact Info Section */}
      <section className="contact-info-section py-5">
        <Container>
          <Row>
            {contactInfo.map((info, index) => (
              <Col
                lg={3}
                md={6}
                key={index}
                className="mb-4"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <Card className="contact-info-card h-100 border-0 shadow-sm">
                  <Card.Body className="text-center p-4">
                    <div className="contact-icon mb-3">{info.icon}</div>
                    <h5 className="contact-title">{info.title}</h5>
                    <p className="contact-details">{info.details}</p>
                    <p className="contact-description text-muted">
                      {info.description}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section py-5 bg-light">
        <Container>
          <Row>
            <Col lg={8} className="mx-auto">
              <Card
                className="contact-form-card border-0 shadow-lg"
                data-aos="fade-up"
              >
                <Card.Body className="p-5">
                  <div className="text-center mb-4">
                    <h2 className="form-title">Send Us a Message</h2>
                    <p className="text-muted">
                      Fill out the form below and we'll get back to you within
                      24 hours.
                    </p>
                  </div>

                  {showAlert && (
                    <Alert variant="success" className="mb-4">
                      <strong>Thank you!</strong> Your message has been sent
                      successfully. We'll get back to you soon.
                    </Alert>
                  )}

                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Full Name *</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                            className="form-control-custom"
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Email Address *</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                            className="form-control-custom"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label>Subject *</Form.Label>
                      <Form.Control
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="What is this regarding?"
                        className="form-control-custom"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>Message *</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us more about your inquiry..."
                        className="form-control-custom"
                        required
                      />
                    </Form.Group>

                    <div className="text-center">
                      <Button
                        type="submit"
                        className="btn-primary-gradient btn-lg"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Sending...
                          </>
                        ) : (
                          <>
                            <FiSend className="me-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="faq-section py-5">
        <Container>
          <Row>
            <Col>
              <div
                className="section-header text-center mb-5"
                data-aos="fade-up"
              >
                <h2 className="section-title">Frequently Asked Questions</h2>
                <p className="section-subtitle text-muted">
                  Quick answers to common questions
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={8} className="mx-auto">
              <div className="faq-list">
                {faqs.map((faq, index) => (
                  <Card
                    key={index}
                    className="faq-card mb-3 border-0 shadow-sm"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <Card.Body className="p-4">
                      <h5 className="faq-question">{faq.question}</h5>
                      <p className="faq-answer text-muted mb-0">{faq.answer}</p>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="map-container" data-aos="fade-up">
          <div className="map-placeholder">
            <div className="map-content">
              <FiMapPin size={48} className="text-primary mb-3" />
              <h4>Visit Our Store</h4>
              <p className="text-muted">123 Shopping St, City, State 12345</p>
              <p className="text-muted">Mon - Fri: 8am - 5pm</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
