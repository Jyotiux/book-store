import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useFirebase } from "../context/Firebase"; // Importing custom Firebase context

const ListingPage = () => {
  const firebase = useFirebase(); // Access Firebase functions from context

  // State variables for form fields
  const [name, setName] = useState("");
  const [isbnNumber, setIsbnNumber] = useState("");
  const [price, setPrice] = useState("");
  const [coverPic] = useState(""); // Placeholder for image (not used currently)

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission (page reload)
    try {
      // Call Firebase function to create a new book listing
      await firebase.handleCreateNewListing(name, isbnNumber, price, coverPic);
      alert("Book listing added successfully!");

      // Reset form fields after successful submission
      setName("");
      setIsbnNumber("");
      setPrice("");
    } catch (error) {
      // Handle and display errors
      console.error("Error creating listing:", error);
      alert("Failed to add book listing.");
    }
  };

  return (
    <div className="container mt-5">
      {/* Book Listing Form */}
      <Form onSubmit={handleSubmit}>
        {/* Book Name Input */}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Enter Book Name</Form.Label>
          <Form.Control
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Book name"
          />
        </Form.Group>

        {/* ISBN Input */}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>ISBN</Form.Label>
          <Form.Control
            onChange={(e) => setIsbnNumber(e.target.value)}
            value={isbnNumber}
            type="text"
            placeholder="ISBN Number"
          />
        </Form.Group>

        {/* Price Input */}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Price</Form.Label>
          <Form.Control
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            type="text"
            placeholder="Enter Price"
          />
        </Form.Group>

        {/* File upload for cover image (currently disabled) */}
        {/* 
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Cover Pic</Form.Label>
          <Form.Control
            onChange={(e) => setCoverPic(e.target.files[0])}
            type="file"
          />
        </Form.Group>
        */}

        {/* Submit Button */}
        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
    </div>
  );
};

export default ListingPage;
