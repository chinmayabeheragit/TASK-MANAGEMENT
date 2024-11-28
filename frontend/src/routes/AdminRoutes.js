import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Admin/Dashboard";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin/dashboard" element={<Dashboard />} />
      {/* Add other admin-specific routes */}
    </Routes>
  );
};

export default AdminRoutes;
