import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BookCard from "../components/Card"; // Component to display individual book details
import { useFirebase } from "../context/Firebase"; // Firebase context hook

const HomePage = () => {
  const firebase = useFirebase(); // Access Firebase functions from context
  const [books, setBooks] = useState([]); // State to hold the list of books

  useEffect(() => {
    // Function to fetch all books from Firebase
    const fetchBooks = async () => {
      try {
        const data = await firebase.listAllBooks(); // Fetch data from Firebase
        if (data) {
          // Convert object to array format with 'id' included
          const booksArray = Object.entries(data).map(([id, book]) => ({
            id,
            ...book,
          }));
          setBooks(booksArray); // Store books in state
        } else {
          setBooks([]); // If no books, set empty array
        }
      } catch (error) {
        console.error("Error fetching books:", error);
        setBooks([]); // On error, clear list
      }
    };

    fetchBooks(); // Call on component mount
  }, [firebase]);

  return (
    <div className="container mt-5">
      {/* If books are available, display in a responsive grid layout */}
      {books.length > 0 ? (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {books.map((book) => (
            <Col key={book.id}>
              {/* Each book is rendered using the BookCard component */}
              <BookCard id={book.id} link={`/book/view/${book.id}`} {...book} />
            </Col>
          ))}
        </Row>
      ) : (
        // Message if no books are found
        <p>No books available</p>
      )}
    </div>
  );
};

export default HomePage;
