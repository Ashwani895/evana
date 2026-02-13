// ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    // User not logged in
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    // User logged in but does not have the required role
    return <Navigate to="/" replace />;
  }

  // User logged in and has required role (or no role required)
  return children;
};

export default ProtectedRoute;
