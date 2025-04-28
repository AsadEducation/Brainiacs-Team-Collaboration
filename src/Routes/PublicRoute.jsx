import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";

const PublicRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;
