import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Tab,
  Tabs,
} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import AOS from "aos";
import "./Auth.css";

const Auth = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [resetEmail, setResetEmail] = useState("");

  const { login, signup, resetPassword, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });

    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!loginData.email || !loginData.password) {
      return setError("Please fill in all fields");
    }

    try {
      setError("");
      setLoading(true);
      await login(loginData.email, loginData.password);
      navigate("/");
    } catch (error) {
      setError("Failed to log in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (
      !signupData.name ||
      !signupData.email ||
      !signupData.password ||
      !signupData.confirmPassword
    ) {
      return setError("Please fill in all fields");
    }

    if (signupData.password !== signupData.confirmPassword) {
      return setError("Passwords do not match");
    }

    if (signupData.password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    try {
      setError("");
      setLoading(true);
      await signup(signupData.email, signupData.password, signupData.name);
      navigate("/");
    } catch (error) {
      setError("Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!resetEmail) {
      return setError("Please enter your email address");
    }

    try {
      setError("");
      setMessage("");
      setLoading(true);
      await resetPassword(resetEmail);
      setMessage("Check your inbox for password reset instructions");
      setResetEmail("");
    } catch (error) {
      setError("Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={5} md={7}>
            <Card className="auth-card" data-aos="fade-up">
              <Card.Body className="p-5">
                <div className="auth-header text-center mb-4">
                  <Link to="/" className="brand-link">
                    <h2 className="brand-text">Your Shop</h2>
                  </Link>
                  <p className="auth-subtitle text-muted">
                    Welcome to your shopping destination
                  </p>
                </div>

                {error && (
                  <Alert variant="danger" className="auth-alert">
                    {error}
                  </Alert>
                )}
                {message && (
                  <Alert variant="success" className="auth-alert">
                    {message}
                  </Alert>
                )}

                <Tabs
                  activeKey={activeTab}
                  onSelect={(k) => {
                    setActiveTab(k);
                    setError("");
                    setMessage("");
                  }}
                  className="auth-tabs mb-4"
                >
                  {/* Login Tab */}
                  <Tab eventKey="login" title="Login">
                    <Form onSubmit={handleLogin} className="auth-form">
                      <Form.Group className="mb-3">
                        <div className="input-group-custom">
                          <FiMail className="input-icon" />
                          <Form.Control
                            type="email"
                            placeholder="Email address"
                            value={loginData.email}
                            onChange={(e) =>
                              setLoginData({
                                ...loginData,
                                email: e.target.value,
                              })
                            }
                            className="form-control-custom"
                            required
                          />
                        </div>
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <div className="input-group-custom">
                          <FiLock className="input-icon" />
                          <Form.Control
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={loginData.password}
                            onChange={(e) =>
                              setLoginData({
                                ...loginData,
                                password: e.target.value,
                              })
                            }
                            className="form-control-custom"
                            required
                          />
                          <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                          </button>
                        </div>
                      </Form.Group>

                      <Button
                        type="submit"
                        className="btn-auth w-100 mb-3"
                        disabled={loading}
                      >
                        {loading ? "Signing In..." : "Sign In"}
                      </Button>

                      <div className="text-center">
                        <button
                          type="button"
                          className="link-button"
                          onClick={() => setActiveTab("reset")}
                        >
                          Forgot your password?
                        </button>
                      </div>
                    </Form>
                  </Tab>

                  {/* Signup Tab */}
                  <Tab eventKey="signup" title="Sign Up">
                    <Form onSubmit={handleSignup} className="auth-form">
                      <Form.Group className="mb-3">
                        <div className="input-group-custom">
                          <FiUser className="input-icon" />
                          <Form.Control
                            type="text"
                            placeholder="Full name"
                            value={signupData.name}
                            onChange={(e) =>
                              setSignupData({
                                ...signupData,
                                name: e.target.value,
                              })
                            }
                            className="form-control-custom"
                            required
                          />
                        </div>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <div className="input-group-custom">
                          <FiMail className="input-icon" />
                          <Form.Control
                            type="email"
                            placeholder="Email address"
                            value={signupData.email}
                            onChange={(e) =>
                              setSignupData({
                                ...signupData,
                                email: e.target.value,
                              })
                            }
                            className="form-control-custom"
                            required
                          />
                        </div>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <div className="input-group-custom">
                          <FiLock className="input-icon" />
                          <Form.Control
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={signupData.password}
                            onChange={(e) =>
                              setSignupData({
                                ...signupData,
                                password: e.target.value,
                              })
                            }
                            className="form-control-custom"
                            required
                          />
                          <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                          </button>
                        </div>
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <div className="input-group-custom">
                          <FiLock className="input-icon" />
                          <Form.Control
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm password"
                            value={signupData.confirmPassword}
                            onChange={(e) =>
                              setSignupData({
                                ...signupData,
                                confirmPassword: e.target.value,
                              })
                            }
                            className="form-control-custom"
                            required
                          />
                          <button
                            type="button"
                            className="password-toggle"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          >
                            {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                          </button>
                        </div>
                      </Form.Group>

                      <Button
                        type="submit"
                        className="btn-auth w-100"
                        disabled={loading}
                      >
                        {loading ? "Creating Account..." : "Create Account"}
                      </Button>
                    </Form>
                  </Tab>

                  {/* Reset Password Tab */}
                  <Tab eventKey="reset" title="Reset Password">
                    <Form onSubmit={handleResetPassword} className="auth-form">
                      <div className="text-center mb-4">
                        <p className="text-muted">
                          Enter your email address and we'll send you a link to
                          reset your password.
                        </p>
                      </div>

                      <Form.Group className="mb-4">
                        <div className="input-group-custom">
                          <FiMail className="input-icon" />
                          <Form.Control
                            type="email"
                            placeholder="Email address"
                            value={resetEmail}
                            onChange={(e) => setResetEmail(e.target.value)}
                            className="form-control-custom"
                            required
                          />
                        </div>
                      </Form.Group>

                      <Button
                        type="submit"
                        className="btn-auth w-100 mb-3"
                        disabled={loading}
                      >
                        {loading ? "Sending..." : "Send Reset Link"}
                      </Button>

                      <div className="text-center">
                        <button
                          type="button"
                          className="link-button"
                          onClick={() => setActiveTab("login")}
                        >
                          Back to Login
                        </button>
                      </div>
                    </Form>
                  </Tab>
                </Tabs>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Auth;
