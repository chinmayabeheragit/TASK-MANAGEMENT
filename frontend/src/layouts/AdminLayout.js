import React from "react";
import Sidebar from "../components/Slidebar";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();

  // Function to navigate to the profile page
  const handleProfileClick = () => {
    navigate("/admin/profile");
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 flex-1 bg-gray-100 min-h-screen">
        <header className="p-4 bg-white shadow flex justify-between items-center">
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          <div className="relative">
            <img
              src="/path/to/profile/icon.png" // Replace with your actual profile icon path
              alt="Profile"
              className="w-8 h-8 rounded-full cursor-pointer"
              onClick={handleProfileClick} // Navigate to the profile page
            />
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
