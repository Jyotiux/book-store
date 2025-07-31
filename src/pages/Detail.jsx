import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

const BookDetailPage = () => {
  // Get the `bookId` from the route parameters
  const params = useParams();

  // Access Firebase context
  const firebase = useFirebase();

  // State to hold quantity for order
  const [qty, setQty] = useState(1);

  // State to store book data
  const [data, setData] = useState(null);

  // State to hold image URL (optional feature - currently unused)
  const [url, setURL] = useState(null);

  // Log the book data when it's fetched
  console.log(data);

  // Fetch book details by ID when component mounts
  useEffect(() => {
    firebase.getBookById(params.bookId).then((value) => setData(value));
  }, []);

  // Optional: Fetch book image URL if needed
  // useEffect(() => {
  //   if (data) {
  //     const imageURL = data.imageURL;
  //     firebase.getImageURL(imageURL).then((url) => setURL(url));
  //   }
  // }, [data]);

  // Function to place an order
  const placeOrder = async () => {
    try {
      const result = await firebase.placeOrder(params.bookId, qty);
      console.log("Order Placed", result);
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  // Show loading state while book data is being fetched
  if (data == null) return <h1>Loading...</h1>;

  return (
    <div className="container mt-5">
      {/* Book title */}
      <h1>{data.name}</h1>

      {/* Book image (optional - currently not shown due to imageURL being commented) */}
      <img src={url} width="50%" style={{ borderRadius: "10px" }} />

      {/* Book details */}
      <h1>Details</h1>
      <p>Price: Rs. {data.price}</p>
      <p>ISBN Number: {data.isbn}</p>

      {/* Owner information */}
      <h1>Owner Details</h1>
      <p>Name: {data.displayName}</p>
      <p>Email: {data.userEmail}</p>

      {/* Quantity input */}
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Qty</Form.Label>
        <Form.Control
          onChange={(e) => setQty(e.target.value)}
          value={qty}
          type="Number"
          placeholder="Enter Qty"
        />
      </Form.Group>

      {/* Order button */}
      <Button onClick={placeOrder} variant="success">
        Buy Now
      </Button>
    </div>
  );
};

export default BookDetailPage;
