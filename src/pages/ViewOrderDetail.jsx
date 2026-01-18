import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Row, Col, Alert } from "react-bootstrap";
import { useFirebase } from "../context/Firebase";
import Loader from "../components/Loader";


const ViewOrderDetails = () => {
  const { bookId } = useParams();
  const firebase = useFirebase();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);


 useEffect(() => {
  setLoading(true);
  firebase.getOrders(bookId).then((ordersObj) => {
    if (!ordersObj) {
      setOrders([]);
    } else {
      const ordersArray = Object.entries(ordersObj).map(([id, data]) => ({
        id,
        ...data,
      }));
      setOrders(ordersArray);
    }
    setLoading(false);
  });
}, [bookId, firebase]);
if (loading) return <Loader />;

  return (
    <Container className="my-4">
      <h3 className="mb-4 text-center">Order Details</h3>

      {orders.length === 0 ? (
        <Alert variant="info" className="text-center">
          No orders found for this book.
        </Alert>
      ) : (
        <Row>
          {orders.map((order) => (
            <Col key={order.id} md={6} lg={4} className="mb-4">
              <Card className="shadow-sm h-100">
                <Card.Body>
                  <Card.Title className="mb-3">
                    Ordered By
                  </Card.Title>

                  <p className="mb-2">
                    <strong>Name:</strong>{" "}
                    {order.displayName || "Anonymous"}
                  </p>

                  <p className="mb-2">
                    <strong>Email:</strong> {order.userEmail}
                  </p>

                  <p className="mb-0">
                    <strong>Quantity:</strong> {order.qty}
                  </p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default ViewOrderDetails;
