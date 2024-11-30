import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Authentication/Login";
import Register from "./pages/Authentication/Register";
import ForgotPassword from "./pages/Authentication/ForgetPassword";
import AdminDashboard from "./pages/Admin/Dashboard";
import UserDashboard from "./pages/User/Dashboard";
import AdminProfile from "./pages/Admin/Profile";
import AdminProject from "./pages/Admin/Project";
import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Login page */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* Register page */}
        <Route path="/register" element={<Register />} />

        {/* Forgot Password page */}
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/profile"
          element={
            <ProtectedRoute>
              <AdminProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/projects"
          element={
            <ProtectedRoute>
              <AdminProject />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
