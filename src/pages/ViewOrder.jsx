import React, { useEffect, useState } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { useFirebase } from "../context/Firebase";
import BookCard from "../components/Card";
import Loader from "../components/Loader";


const OrdersPage = () => {
  const firebase = useFirebase();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);


useEffect(() => {
  if (firebase.isLoggedIn) {
    setLoading(true);
    firebase.fetchMyBooks(firebase.user.uid).then((booksObj) => {
      if (!booksObj) {
        setBooks([]);
      } else {
        const booksArray = Object.entries(booksObj).map(([id, data]) => ({
          id,
          ...data,
        }));
        setBooks(booksArray);
      }
      setLoading(false);
    });
  }
}, [firebase]);
if (loading) return <Loader />;


  // Extra safety (though route is already protected)
  if (!firebase.isLoggedIn) {
    return (
      <Container className="mt-5 text-center">
        <h4>Please log in to view your orders</h4>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <h3 className="mb-4 text-center">My Book Orders</h3>

      {books.length === 0 ? (
        <Alert variant="info" className="text-center">
          You have not listed any books yet.
        </Alert>
      ) : (
        <Row>
          {books.map((book) => (
            <Col key={book.id} md={6} lg={4} className="mb-4">
              <BookCard
                id={book.id}
                {...book}
                link={`/books/orders/${book.id}`}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default OrdersPage;
