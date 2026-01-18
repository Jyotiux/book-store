import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useFirebase } from "../context/Firebase";

const ListingPage = () => {
  const firebase = useFirebase();

  const [name, setName] = useState("");
  const [isbnNumber, setIsbnNumber] = useState("");
  const [price, setPrice] = useState("");
  const [coverPic] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await firebase.handleCreateNewListing(
        name,
        isbnNumber,
        price,
        coverPic
      );

      alert("Book listing added successfully!");
      setName("");
      setIsbnNumber("");
      setPrice("");
    } catch (error) {
      console.error("Error creating listing:", error);
      alert("Failed to add book listing.");
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <h3 className="text-center mb-4">Add New Book</h3>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Book Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter book name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>ISBN</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter ISBN number"
                    value={isbnNumber}
                    onChange={(e) => setIsbnNumber(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button variant="primary" type="submit">
                    Create Listing
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

export default ListingPage;
