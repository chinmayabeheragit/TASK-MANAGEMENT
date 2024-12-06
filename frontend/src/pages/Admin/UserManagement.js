import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import DashboardIcon from "@mui/icons-material/Dashboard"; // Import dashboard icon
import Button from "@mui/material/Button"; // Import Button component from Material UI

function UserManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [userForm, setUserForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [status, setStatus] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [users, setUsers] = useState([]); // Track users
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [usersPerPage] = useState(5); // Number of users per page

  // Handle input change
  const handleChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  // Open modal to create a new user
  const handleCreateUser = () => {
    setUserForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
    });
    setSelectedUserId(null);
    setIsModalOpen(true);
  };

  // Open modal to update user
  const handleUpdateUser = (userId) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  // Open modal to change status
  const handleChangeStatus = (userId, currentStatus) => {
    setSelectedUserId(userId);
    setStatus(currentStatus);
    setIsStatusModalOpen(true);
  };

  // Handle status change and update the users array
  const handleStatusChange = (newStatus) => {
    const updatedUsers = users.map((user) =>
      user.id === selectedUserId
        ? { ...user, status: newStatus }
        : user
    );
    setUsers(updatedUsers);
    setIsStatusModalOpen(false);
  };

  // Handle form submission to create a user
  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      id: Date.now(), // Simple ID generator for demo purposes
      ...userForm,
      status: "Pending", // Default status when user is created
    };
    setUsers([...users, newUser]); // Add the new user to the list
    setIsModalOpen(false); // Close the modal
  };

  // Delete user from the list
  const handleDeleteUser = (userId) => {
    const filteredUsers = users.filter((user) => user.id !== userId);
    setUsers(filteredUsers);
  };

  // Get users for the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-6">
      {/* Navigate to Dashboard Button */}
      <Link
        to="/admin/dashboard"
        className="flex items-center text-gray-700 hover:text-yellow-500 mb-6"
      >
        <Button
          variant="outlined"
          startIcon={<DashboardIcon />}
          className="text-gray-800 border-gray-800 hover:border-yellow-500 hover:text-yellow-500"
        >
          Dashboard
        </Button>
      </Link>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">User Management</h2>
        <button
          onClick={handleCreateUser}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create User
        </button>
      </div>

      {/* User Table */}
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="text-left bg-gray-100">
            <th className="p-3">Username</th>
            <th className="p-3">Email</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Joining Date</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Display all users dynamically */}
          {currentUsers.map((user) => (
            <tr key={user.id} className="border-t hover:bg-gray-50">
              <td className="p-3">{user.firstName} {user.lastName}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">{user.phone}</td>
              <td className="p-3">01/01/2022</td>
              <td className="p-3">
                <button
                  onClick={() => handleChangeStatus(user.id, user.status)}
                  className={`text-white px-4 py-2 rounded ${
                    user.status === "Pending"
                      ? "bg-yellow-500 hover:bg-yellow-600"
                      : user.status === "Approved"
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  {user.status}
                </button>
              </td>
              <td className="p-3 space-x-2">
                <button
                  onClick={() => handleUpdateUser(user.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-500 text-white rounded-l disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastUser >= users.length}
          className="px-4 py-2 bg-gray-500 text-white rounded-r disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Create/Update User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Create/Update User</h3>
            <form onSubmit={handleSubmit}>
              <label className="block mt-4">First Name:
                <input
                  type="text"
                  name="firstName"
                  value={userForm.firstName}
                  onChange={handleChange}
                  className="mt-2 p-2 w-full border rounded"
                />
              </label>
              <label className="block mt-4">Last Name:
                <input
                  type="text"
                  name="lastName"
                  value={userForm.lastName}
                  onChange={handleChange}
                  className="mt-2 p-2 w-full border rounded"
                />
              </label>
              <label className="block mt-4">Email:
                <input
                  type="email"
                  name="email"
                  value={userForm.email}
                  onChange={handleChange}
                  className="mt-2 p-2 w-full border rounded"
                />
              </label>
              <label className="block mt-4">Phone:
                <input
                  type="text"
                  name="phone"
                  value={userForm.phone}
                  onChange={handleChange}
                  className="mt-2 p-2 w-full border rounded"
                />
              </label>
              <label className="block mt-4">Password:
                <input
                  type="password"
                  name="password"
                  value={userForm.password}
                  onChange={handleChange}
                  className="mt-2 p-2 w-full border rounded"
                />
              </label>
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Status Change Modal */}
      {isStatusModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Change User Status</h3>
            <div className="flex space-x-4">
              <button
                onClick={() => handleStatusChange("Pending")}
                className="bg-yellow-500 text-white px-4 py-2 rounded"
              >
                Pending
              </button>
              <button
                onClick={() => handleStatusChange("Approved")}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Approved
              </button>
              <button
                onClick={() => handleStatusChange("Rejected")}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Rejected
              </button>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setIsStatusModalOpen(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserManagement;
