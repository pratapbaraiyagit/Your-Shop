import { Container, Row, Col, Card } from "react-bootstrap";
import { FiTarget, FiHeart, FiUsers, FiAward } from "react-icons/fi";
import { useEffect } from "react";
import AOS from "aos";
import "./About.css";

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const values = [
    {
      icon: <FiTarget size={40} />,
      title: "Our Mission",
      description:
        "To provide exceptional products and outstanding customer service that exceeds expectations.",
    },
    {
      icon: <FiHeart size={40} />,
      title: "Our Passion",
      description:
        "We are passionate about connecting people with products they love and creating memorable shopping experiences.",
    },
    {
      icon: <FiUsers size={40} />,
      title: "Our Community",
      description:
        "Building a community of satisfied customers who trust us for their shopping needs.",
    },
    {
      icon: <FiAward size={40} />,
      title: "Our Quality",
      description:
        "Committed to offering only the highest quality products from trusted brands and suppliers.",
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300",
      description: "Visionary leader with 15+ years in e-commerce",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image:
        "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=300",
      description: "Tech expert ensuring seamless shopping experience",
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Marketing",
      image:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300",
      description: "Creative strategist connecting brands with customers",
    },
  ];

  const stats = [
    { number: "50K+", label: "Happy Customers" },
    { number: "10K+", label: "Products" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" },
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <Container>
          <Row className="align-items-center min-vh-75">
            <Col lg={6} data-aos="fade-right">
              <div className="hero-content">
                <h1 className="hero-title">
                  About our Shop
                </h1>
                <p className="hero-description">
                  We're more than just an e-commerce platform. We're your
                  trusted partner in discovering amazing products, connecting
                  with quality brands, and creating exceptional shopping
                  experiences that bring joy to your everyday life.
                </p>
                <div className="hero-stats">
                  {stats.map((stat, index) => (
                    <div key={index} className="stat-item">
                      <div className="stat-number">{stat.number}</div>
                      <div className="stat-label">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Col>
            <Col lg={6} data-aos="fade-left">
              <div className="hero-image">
                <img
                  src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="About Us"
                  className="img-fluid rounded-4 shadow-lg"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Values Section */}
      <section className="values-section py-5 bg-light">
        <Container>
          <Row>
            <Col>
              <div
                className="section-header text-center mb-5"
                data-aos="fade-up"
              >
                <h2 className="section-title">Our Core Values</h2>
                <p className="section-subtitle text-muted">
                  The principles that guide everything we do
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            {values.map((value, index) => (
              <Col
                lg={3}
                md={6}
                key={index}
                className="mb-4"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <Card className="value-card h-100 border-0 shadow-sm">
                  <Card.Body className="text-center p-4">
                    <div className="value-icon mb-3">{value.icon}</div>
                    <h5 className="value-title">{value.title}</h5>
                    <p className="value-description text-muted">
                      {value.description}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Story Section */}
      <section className="story-section py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4" data-aos="fade-right">
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Our Story"
                className="img-fluid rounded-4 shadow-lg"
              />
            </Col>
            <Col lg={6} data-aos="fade-left">
              <div className="story-content">
                <h2 className="story-title">Our Story</h2>
                <p className="story-text">
                  Founded in 2020, Your Shop began as a small startup with a big
                  dream: to revolutionize online shopping by making it more
                  personal, reliable, and enjoyable. What started as a passion
                  project has grown into a thriving e-commerce platform serving
                  thousands of customers worldwide.
                </p>
                <p className="story-text">
                  Our journey has been driven by a simple belief - that shopping
                  should be an experience that brings joy, not stress. Every
                  feature we build, every partnership we form, and every
                  customer interaction we have is guided by this principle.
                </p>
                <p className="story-text">
                  Today, we're proud to offer a curated selection of products
                  from trusted brands, backed by exceptional customer service
                  and a commitment to quality that never wavers.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Team Section */}
      <section className="team-section py-5 bg-light">
        <Container>
          <Row>
            <Col>
              <div
                className="section-header text-center mb-5"
                data-aos="fade-up"
              >
                <h2 className="section-title">Meet Our Team</h2>
                <p className="section-subtitle text-muted">
                  The passionate people behind Your Shop
                </p>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center">
            {team.map((member, index) => (
              <Col
                lg={4}
                md={6}
                key={index}
                className="mb-4"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <Card className="team-card border-0 shadow-sm">
                  <div className="team-image-wrapper">
                    <Card.Img
                      variant="top"
                      src={member.image}
                      alt={member.name}
                      className="team-image"
                    />
                  </div>
                  <Card.Body className="text-center p-4">
                    <h5 className="team-name">{member.name}</h5>
                    <p className="team-role text-primary mb-2">{member.role}</p>
                    <p className="team-description text-muted">
                      {member.description}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-5">
        <Container>
          <Row>
            <Col lg={8} className="mx-auto text-center" data-aos="fade-up">
              <h2 className="cta-title text-white mb-3">
                Ready to Start Shopping?
              </h2>
              <p className="cta-description text-white-50 mb-4">
                Join thousands of satisfied customers and discover amazing
                products at unbeatable prices.
              </p>
              <div className="cta-buttons">
                <a href="/products" className="btn btn-light btn-lg me-3">
                  Browse Products
                </a>
                <a href="/contact" className="btn btn-outline-light btn-lg">
                  Contact Us
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default About;
