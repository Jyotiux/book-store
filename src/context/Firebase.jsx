import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getDatabase,
  ref as dbRef,
  set,
  push,
  get,
} from "firebase/database";

// Create a Context for Firebase so it can be accessed via React Context API
const FirebaseContext = createContext(null);
// Custom hook to access Firebase context easily
export const useFirebase = () => useContext(FirebaseContext);

// Your Firebase config object (replace with your own Firebase credentials)
const firebaseConfig = {
  apiKey: "AIzaSyDRXxwPGrYecC_zeVmDcoHaJ-YOu4rQVRU",
  authDomain: "bookify-d15fd.firebaseapp.com",
  databaseURL: "https://bookify-d15fd-default-rtdb.firebaseio.com",
  projectId: "bookify-d15fd",
  storageBucket: "bookify-d15fd.firebasestorage.app",
  messagingSenderId: "452062635555",
  appId: "1:452062635555:web:84fe0d1b4e0c45b9baf396",
  measurementId: "G-P8DMH55ZCN",
};

// Initialize Firebase App, Auth, Realtime Database, and Google Provider
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const realtimeDB = getDatabase(firebaseApp);
const googleProvider = new GoogleAuthProvider();

// Provider component to wrap around your app and provide Firebase features via context
export const FirebaseProvider = ({ children }) => {
  // User state to keep track of logged-in user
  const [user, setUser] = useState(null);

  // Listen for auth state changes (login/logout) and update `user` state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setUser(user || null);
    });
    return () => unsubscribe();
  }, []);

  // Firebase Authentication functions
  const signupUserWithEmailAndPassword = (email, password) =>
    createUserWithEmailAndPassword(firebaseAuth, email, password);

  const signinUserWithEmailAndPass = (email, password) =>
    signInWithEmailAndPassword(firebaseAuth, email, password);

  const signinWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider);

  // Create a new book listing in the Realtime Database
  const handleCreateNewListing = async (name, isbn, price) => {
    if (!user) throw new Error("User not logged in");

    const newListingRef = push(dbRef(realtimeDB, "books")); // generate new key
    await set(newListingRef, {
      name,
      isbn,
      price,
      userID: user.uid,
      userEmail: user.email,
      displayName: user.displayName || "",
      // photoURL: user.photoURL || "",
    });

    return newListingRef;
  };

  // Fetch all books from Realtime Database
  const listAllBooks = async () => {
    const snapshot = await get(dbRef(realtimeDB, "books"));
    return snapshot.exists() ? snapshot.val() : {};
  };

  // Fetch a single book by its ID
  const getBookById = async (id) => {
    const snapshot = await get(dbRef(realtimeDB, `books/${id}`));
    return snapshot.exists() ? snapshot.val() : null;
  };

  // Place an order for a specific book
  const placeOrder = async (bookId, qty) => {
    if (!user) throw new Error("User not logged in");

    const newOrderRef = push(dbRef(realtimeDB, `books/${bookId}/orders`));
    await set(newOrderRef, {
      qty: Number(qty),
      userID: user.uid,
      userEmail: user.email,
      displayName: user.displayName || "",
      // photoURL: user.photoURL || "",
    });

    return newOrderRef;
  };

  // Fetch all books listed by the logged-in user
  const fetchMyBooks = async (userId) => {
    const snapshot = await get(dbRef(realtimeDB, "books"));
    if (!snapshot.exists()) return {};

    const books = snapshot.val();
    const myBooks = {};
    Object.entries(books).forEach(([key, book]) => {
      if (book.userID === userId) {
        myBooks[key] = book;
      }
    });

    return myBooks;
  };

  // Get all orders for a specific book
  const getOrders = async (bookId) => {
    const snapshot = await get(dbRef(realtimeDB, `books/${bookId}/orders`));
    return snapshot.exists() ? snapshot.val() : {};
  };

  // Boolean to check if user is logged in
  const isLoggedIn = !!user;

  // Logout function calling Firebase's signOut
  const signOutUser = () => {
    return signOut(firebaseAuth);
  };

  // Provide all functions and state through context value
  return (
    <FirebaseContext.Provider
      value={{
        signinWithGoogle,
        signupUserWithEmailAndPassword,
        signinUserWithEmailAndPass,
        handleCreateNewListing,
        listAllBooks,
        getBookById,
        placeOrder,
        fetchMyBooks,
        getOrders,
        isLoggedIn,
        user,
        signOutUser, // <-- export logout function here
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
