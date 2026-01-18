import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Alert,
} from "react-bootstrap";
import { useFirebase } from "../context/Firebase";

const RegisterPage = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (firebase.isLoggedIn) {
      navigate("/");
    }
  }, [firebase, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // ✅ CORRECT function name
      await firebase.signupUserWithEmailAndPassword(email, password);
      navigate("/");
    } catch (err) {
      console.error("Signup error:", err);

      switch (err.code) {
        case "auth/email-already-in-use":
          setError("Email already in use. Try logging in.");
          break;
        case "auth/weak-password":
          setError("Password must be at least 6 characters.");
          break;
        case "auth/invalid-email":
          setError("Invalid email address.");
          break;
        default:
          setError("Error creating account. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="shadow-sm">
            <Card.Body>
              <h3 className="text-center mb-4">Register</h3>

              {error && (
                <Alert variant="danger" className="text-center">
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Create password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Form.Text className="text-muted">
                    Password must be at least 6 characters.
                  </Form.Text>
                </Form.Group>

                <div className="d-grid">
                  <Button type="submit" variant="primary" disabled={loading}>
                    {loading ? "Creating account..." : "Register"}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
