// src/pages/NotFound.jsx
import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";

const NotFound = () => {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center text-center" style={{ minHeight: "80vh" }}>
      <h1 className="display-1 fw-bold text-primary">404</h1>

      <h3 className="mb-3">Page Not Found</h3>

      <p className="text-muted mb-4" style={{ maxWidth: "400px" }}>
        Sorry, the page you’re looking for doesn’t exist or may have been moved.
      </p>

      <Link to="/">
        <Button variant="primary">Go Back Home</Button>
      </Link>
    </Container>
  );
};

export default NotFound;
