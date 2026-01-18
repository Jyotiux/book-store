import { Navigate } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

const ProtectedRoute = ({ children }) => {
  const { user } = useFirebase();
  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
