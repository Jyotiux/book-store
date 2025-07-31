import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useFirebase } from '../context/Firebase';

const LoginPage = () => {
  const firebase = useFirebase(); // Access Firebase functions from context
  const navigate = useNavigate(); // React Router navigation hook

  // State variables to hold email and password inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // If user is already logged in, redirect to home page
  useEffect(() => {
    if (firebase.isLoggedIn) {
      navigate("/");
    }
  }, [firebase, navigate]);

  // Handle form submission for login with email and password
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form reload
    console.log('Login a user');
    const result = await firebase.signinUserWithEmailAndPass(email, password);
    console.log('successful', result);
  };

  return (
    <div className="container">
      {/* Email/Password Login Form */}
      <Form onSubmit={handleSubmit}>
        {/* Email Field */}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        {/* Password Field */}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        {/* Login Button */}
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>

      {/* Google Sign-In Option */}
      <h1 className="mt-5 p-5">OR</h1>
      <Button onClick={firebase.signinWithGoogle} variant="danger">
        Sign in With Google
      </Button>
    </div>
  );
};

export default LoginPage;
