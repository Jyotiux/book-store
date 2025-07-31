import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { useFirebase } from "../context/Firebase";
import { useNavigate, NavLink } from "react-router-dom";

const MyNavbar = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  // Logout handler calls Firebase logout and redirects to login page
  const handleLogout = async () => {
    try {
      await firebase.signOutUser();
      navigate("/login");
    } catch (error) {
      alert("Logout failed: " + error.message);
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        {/* Brand logo/name that links to home */}
        <Navbar.Brand as={NavLink} to="/">
          BookNest
        </Navbar.Brand>
        {/* Navigation links using NavLink for SPA routing */}
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/" end>
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/book/list">
            Add Listing
          </Nav.Link>
          <Nav.Link as={NavLink} to="/book/orders">
            Orders
          </Nav.Link>
        </Nav>
        {/* Logout button */}
        <Button variant="outline-light" onClick={handleLogout}>
          Logout
        </Button>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
