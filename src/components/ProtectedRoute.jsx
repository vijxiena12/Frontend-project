import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isAuth = localStorage.getItem("isAuth");

  return isAuth ? children : <Navigate to="/" />;
}

export default ProtectedRoute;