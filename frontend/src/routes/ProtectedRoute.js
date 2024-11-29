import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");

  // Admin route validation
  const isAdminRoute = window.location.pathname.startsWith("/admin");
  if (isAdminRoute && token !== "adminToken") {
    return <Navigate to="/login" />;
  }

  // User route validation
  const isUserRoute = window.location.pathname.startsWith("/user");
  if (isUserRoute && token !== "userToken") {
    return <Navigate to="/login" />;
  }

  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
