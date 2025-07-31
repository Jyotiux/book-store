import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useFirebase } from '../context/Firebase';

const RegisterPage = () => {
  const firebase = useFirebase();     // Access Firebase functions from context
  const navigate = useNavigate();     // Hook for navigation after registration

  // State variables to store email and password inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit
    console.log('Signing up a user');

    try {
      // Call Firebase signup method with email and password
      const result = await firebase.signupUserWithEmailAndPassword(email, password);
      console.log('successful', result);
      alert("Account created successfully!");

      // Optional: Redirect to login or home page after signup
      navigate("/login");
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Error creating account. Try again.");
    }
  };

  return (
    <div className="container">
      {/* Registration Form */}
      <Form onSubmit={handleSubmit}>
        {/* Email Input */}
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

        {/* Password Input */}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        {/* Submit Button */}
        <Button variant="primary" type="submit">
          Create Account
        </Button>
      </Form>
    </div>
  );
};

export default RegisterPage;
