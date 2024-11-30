import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Ensure the useNavigate hook is imported
import HomeIcon from "@mui/icons-material/Home";
import profileImage from "../../assets/profile.avif";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate(); // useNavigate hook

  const handlePasswordUpdate = () => {
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
      alert("Password Updated!");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 text-gray-100 overflow-x-hidden">
      {/* Home Button - Corrected Navigation */}
      <div className="absolute top-6 left-6">
        <button
          onClick={() => navigate("/admin/dashboard")} // Ensure it navigates to the dashboard
          className="flex items-center space-x-2 bg-gray-900 p-3 rounded-lg shadow-lg hover:bg-gray-800 transition transform hover:scale-105"
        >
          <HomeIcon className="text-white" />
          <span className="text-white font-semibold">Dashboard</span>
        </button>
      </div>

      {/* Profile Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-6 lg:px-20 py-12"
      >
        {/* Profile Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-12">
          <div className="flex items-center gap-8">
            <div className="relative">
              <img
                src={profileImage}
                alt="Profile"
                className="w-40 h-40 rounded-full border-4 border-indigo-500 shadow-md object-cover"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold">John Doe</h1>
              <p className="text-lg text-gray-300">Software Engineer</p>
              <p className="text-sm text-gray-400 mt-1">john.doe@example.com</p>
            </div>
          </div>

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition transform hover:scale-105"
            >
              Edit Profile
            </button>
          )}
        </div>

        {/* Personal Information */}
        {isEditing ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <h2 className="text-2xl font-semibold">Edit Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium">Full Name</label>
                <input
                  type="text"
                  defaultValue="John Doe"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-500 bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  defaultValue="john.doe@example.com"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-500 bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Phone Number</label>
                <input
                  type="tel"
                  defaultValue="+123456789"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-500 bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Address</label>
                <input
                  type="text"
                  defaultValue="123 Main Street, New York"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-500 bg-gray-50"
                />
              </div>
            </div>
            <div className="text-right">
              <button
                onClick={() => setIsEditing(false)}
                className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition transform hover:scale-105"
              >
                Save Changes
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <h2 className="text-2xl font-semibold">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium">Full Name</p>
                <p className="text-lg mt-1">John Doe</p>
              </div>
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-lg mt-1">john.doe@example.com</p>
              </div>
              <div>
                <p className="text-sm font-medium">Phone Number</p>
                <p className="text-lg mt-1">+123456789</p>
              </div>
              <div>
                <p className="text-sm font-medium">Address</p>
                <p className="text-lg mt-1">123 Main Street, New York</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Security */}
        <div className="mt-12 space-y-8">
          <h2 className="text-2xl font-semibold">Security</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium">New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 bg-gray-50"
              />
            </div>
          </div>
          {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
          <button
            className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition transform hover:scale-105"
            onClick={handlePasswordUpdate}
          >
            Update Password
          </button>
        </div>

        {/* Activity Logs */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold">Activity Logs</h2>
          <ul className="mt-6 space-y-4">
            <li className="p-4 bg-gray-800 text-gray-200 rounded-lg shadow-md">
              Logged in from Chrome on Nov 30, 2024
            </li>
            <li className="p-4 bg-gray-800 text-gray-200 rounded-lg shadow-md">
              Password changed on Nov 25, 2024
            </li>
            <li className="p-4 bg-gray-800 text-gray-200 rounded-lg shadow-md">
              Profile updated on Nov 20, 2024
            </li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
