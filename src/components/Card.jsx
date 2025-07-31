import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { useFirebase } from "../context/Firebase";

const BookCard = (props) => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [url, setURL] = useState(null);

  // Example for fetching image URL (commented out, customize as needed)
  // useEffect(() => {
  //   firebase.getImageURL(props.imageURL).then((url) => setURL(url));
  // }, []);

  console.log(props);

  return (
    <Card style={{ width: "18rem", margin: "25px" }}>
      {/* Show book image if available */}
      <Card.Img variant="top" src={url} />
      <Card.Body>
        {/* Display book name */}
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
          This book has a title <strong>{props.name}</strong> and is sold by{" "}
          <strong>{props.displayName}</strong>. It costs Rs. <strong>{props.price}</strong>.
        </Card.Text>
        {/* Button navigates to book details page */}
        <Button onClick={() => navigate(props.link)} variant="primary">
          View
        </Button>
      </Card.Body>
    </Card>
  );
};

export default BookCard;
