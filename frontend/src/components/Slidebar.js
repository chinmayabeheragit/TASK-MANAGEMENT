import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-gray-800 text-white fixed">
      <div className="p-4 text-lg font-bold">Admin Panel</div>
      <nav>
        <ul>
          <li className="p-4 hover:bg-gray-700">
            <Link to="/admin/dashboard">Dashboard</Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link to="/admin/tasks">Tasks</Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link to="/admin/projects">Projects</Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link to="/admin/users">Users</Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link to="/admin/profile">Profile</Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link to="/admin/settings">Settings</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
