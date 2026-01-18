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

  const handleLogout = async () => {
    try {
      await firebase.signOutUser();
      navigate("/login");
    } catch (error) {
      alert("Logout failed: " + error.message);
    }
  };

  // helper for active link styling
  const navLinkClass = ({ isActive }) =>
    isActive ? "fw-bold text-warning" : "text-light";

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        {/* Brand */}
        <Navbar.Brand as={NavLink} to="/" className="fw-bold">
          ReadersStop
        </Navbar.Brand>

        {/* Left navigation */}
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/" end className={navLinkClass}>
            Home
          </Nav.Link>

          {firebase.isLoggedIn && (
            <>
              <Nav.Link
                as={NavLink}
                to="/book/list"
                className={navLinkClass}
              >
                Add Book
              </Nav.Link>

              <Nav.Link
                as={NavLink}
                to="/book/orders"
                className={navLinkClass}
              >
                My Orders
              </Nav.Link>
            </>
          )}
        </Nav>

        {/* Right side */}
        {firebase.isLoggedIn ? (
          <>
            {/* user email */}
            {firebase.user?.email && (
  <span className="text-light me-3 small">
    {firebase.user.email.split("@")[0]}
  </span>
)}


            <Button variant="outline-light" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="outline-light"
              className="me-2"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button
              variant="light"
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
          </>
        )}
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
