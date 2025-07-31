import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // To get the dynamic route parameter (bookId)
import { useFirebase } from "../context/Firebase"; // Custom Firebase context hook

const ViewOrderDetails = () => {
  const { bookId } = useParams(); // Extract the bookId from the URL parameters
  const firebase = useFirebase(); // Access Firebase functions from context

  const [orders, setOrders] = useState([]); // Local state to store list of orders for this book

  useEffect(() => {
    // Fetch orders from Firebase for the given bookId
    firebase.getOrders(bookId).then((ordersObj) => {
      if (!ordersObj) {
        setOrders([]); // If no orders found, clear the list
        return;
      }

      // Convert Firebase object to an array with IDs included
      const ordersArray = Object.entries(ordersObj).map(([id, data]) => ({
        id,
        ...data,
      }));

      setOrders(ordersArray); // Store the orders in local state
    });
  }, [bookId, firebase]); // Run when bookId or firebase changes

  return (
    <div className="container mt-3">
      <h1>Orders</h1>

      {/* If there are no orders, show a message */}
      {orders.length === 0 && <p>No orders found.</p>}

      {/* Map over the orders array and display each one */}
      {orders.map((order) => (
        <div
          key={order.id}
          className="mt-5"
          style={{ border: "1px solid", padding: "10px" }}
        >
          <h5>Order By: {order.displayName || "Anonymous"}</h5> {/* Fallback in case displayName is missing */}
          <h6>Qty: {order.qty}</h6>
          <p>Email: {order.userEmail}</p>
        </div>
      ))}
    </div>
  );
};

export default ViewOrderDetails;
