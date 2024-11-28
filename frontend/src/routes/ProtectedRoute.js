import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");

  // Check for admin-specific routes
  const isAdminRoute = window.location.pathname.startsWith("/admin");
  if (isAdminRoute && token !== "adminToken") {
    return <Navigate to="/login" />;
  }

  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
