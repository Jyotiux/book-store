import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase"; // Custom Firebase hook/context
import BookCard from "../components/Card"; // Component to display each book

const OrdersPage = () => {
  const firebase = useFirebase(); // Access Firebase context
  const [books, setBooks] = useState([]); // State to hold the list of books

  useEffect(() => {
    // Only fetch books if user is logged in
    if (firebase.isLoggedIn) {
      // Fetch books listed by the currently logged-in user
      firebase.fetchMyBooks(firebase.user.uid).then((booksObj) => {
        if (!booksObj) {
          setBooks([]); // If no books found, set an empty list
          return;
        }

        // Convert the returned object into an array of book objects with IDs
        const booksArray = Object.entries(booksObj).map(([id, data]) => ({
          id,
          ...data,
        }));

        setBooks(booksArray); // Update state with the formatted book list
      });
    }
  }, [firebase]);

  // If user is not logged in, prompt them to log in
  if (!firebase.isLoggedIn) return <h1>Please log in</h1>;

  return (
    <div className="container mt-4">
      {/* Render a BookCard for each book listed by the user */}
      {books.map((book) => (
        <BookCard
          key={book.id}
          id={book.id}
          {...book}
          link={`/books/orders/${book.id}`} // Link to view orders for this specific book
        />
      ))}
    </div>
  );
};

export default OrdersPage;
