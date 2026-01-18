import { Route, Routes } from "react-router-dom";

// Components
import MyNavbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Loader from "./components/Loader";

// Pages
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import ListingPage from "./pages/List";
import HomePage from "./pages/Home";
import BookDetailPage from "./pages/Detail";
import OrdersPage from "./pages/ViewOrder";
import ViewOrderDetails from "./pages/ViewOrderDetail";
import NotFound from "./pages/NotFound";

// CSS
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div>
      <MyNavbar />

      <Routes>
        <Route path="/loader" element={<Loader />} />
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/book/list" element={<ListingPage />} />
        <Route path="/book/view/:bookId" element={<BookDetailPage />} />

        {/* Protected Routes */}
        <Route
          path="/book/orders"
          element={
            <ProtectedRoute>
              <OrdersPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/books/orders/:bookId"
          element={
            <ProtectedRoute>
              <ViewOrderDetails />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />

      </Routes>
    </div>
  );
}

export default App;
