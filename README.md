
# Bookstore App

This is a full-stack web application built using React.js and Firebase. It allows users to register, login, list books for sale, view book details, place orders, and view received orders.

https://bookify-d15fd.web.app/


## Features

* Firebase Authentication (Email/Password and Google Sign-in)
* List and view books
* Place orders for books
* View orders placed on your listed books
* Firebase Database for storing data

## Tech Stack

Frontend:

* React.js
* React Bootstrap
* React Router

Backend:

* Firebase Authentication
* Firebase Database
* Firebase Storage (optional for book images)

## Project Structure

```
src/
├── components/
│   └── Card.jsx
├── context/
│   └── Firebase.js
├── pages/
│   ├── Home.jsx
│   ├── Detail.jsx
│   ├── Listing.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Orders.jsx
│   └── ViewOrderDetails.jsx
└── App.jsx
```

## Getting Started

1. Clone the repository

```
git clone https://github.com/yourusername/bookstore-app.git
cd bookstore-app
```

2. Install dependencies

```
npm install
```

3. Set up Firebase

* Go to [https://console.firebase.google.com](https://console.firebase.google.com) and create a new project
* Enable Email/Password and Google authentication
* Enable Realtime Database
* (Optional) Enable Firebase Storage for book images
* Copy your Firebase configuration and add it to `Firebase.js` inside the context folder

Example:

```
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};
```

4. Run the app

```
npm start
```

This will start the app at [http://localhost:3000](http://localhost:3000)

## Firebase Functions

Authentication:

* signupUserWithEmailAndPassword
* signinUserWithEmailAndPass
* signinWithGoogle

Books:

* handleCreateNewListing
* listAllBooks
* getBookById
* getImageURL (optional for images)

Orders:

* placeOrder
* getOrders
* fetchMyBooks

## Routes

* `/` – Home page showing all books
* `/book/view/:bookId` – View book details and place order
* `/book/list` – Add a new book
* `/login` – Login page
* `/register` – Registration page
* `/books/orders/:bookId` – View orders for your listed book

## Optional Improvements

* Add image upload functionality
* Add search and filter
* Add validation to forms
* Add admin analytics
* Improve UI styling

## Deployment

To deploy using Firebase Hosting:

```
npm run build
firebase login
firebase init
firebase deploy
```

