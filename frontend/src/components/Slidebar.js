import React from "react";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TaskIcon from "@mui/icons-material/Task";
import ProjectIcon from "@mui/icons-material/Work";
import UserIcon from "@mui/icons-material/People";
import ProfileIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SupportIcon from "@mui/icons-material/Help";
import GroupsIcon from "@mui/icons-material/Groups";

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-gray-800 text-white fixed shadow-lg">
      <div className="p-4 text-lg font-bold flex items-center space-x-2">
        <span>Admin Panel</span>
      </div>
      <nav>
        <ul>
          <li className="p-4 hover:bg-gray-700 transition duration-300">
            <Link to="/admin/dashboard" className="flex items-center space-x-3">
              <DashboardIcon />
              <span>Dashboard</span>
            </Link>
          </li>
          <li className="p-4 hover:bg-gray-700 transition duration-300">
            <Link to="/admin/tasks" className="flex items-center space-x-3">
              <TaskIcon />
              <span>Tasks</span>
            </Link>
          </li>
          <li className="p-4 hover:bg-gray-700 transition duration-300">
            <Link to="/admin/projects" className="flex items-center space-x-3">
              <ProjectIcon />
              <span>Projects</span>
            </Link>
          </li>
          <li className="p-4 hover:bg-gray-700 transition duration-300">
            <Link to="/admin/users" className="flex items-center space-x-3">
              <UserIcon />
              <span>Users</span>
            </Link>
          </li>
          <li className="p-4 hover:bg-gray-700 transition duration-300">
            <Link to="/admin/profile" className="flex items-center space-x-3">
              <ProfileIcon />
              <span>Profile</span>
            </Link>
          </li>
          <li className="p-4 hover:bg-gray-700 transition duration-300">
            <Link to="/admin/settings" className="flex items-center space-x-3">
              <SettingsIcon />
              <span>Settings</span>
            </Link>
          </li>
          <li className="p-4 hover:bg-gray-700 transition duration-300">
            <Link to="/admin/completed-tasks" className="flex items-center space-x-3">
              <DoneIcon />
              <span>Completed Tasks</span>
            </Link>
          </li>
          <li className="p-4 hover:bg-gray-700 transition duration-300">
            <Link to="/admin/trash" className="flex items-center space-x-3">
              <DeleteIcon />
              <span>Trash</span>
            </Link>
          </li>
          <li className="p-4 hover:bg-gray-700 transition duration-300">
            <Link to="/admin/notifications" className="flex items-center space-x-3">
              <NotificationsIcon />
              <span>Notifications</span>
            </Link>
          </li>
          <li className="p-4 hover:bg-gray-700 transition duration-300">
            <Link to="/admin/support" className="flex items-center space-x-3">
              <SupportIcon />
              <span>Support</span>
            </Link>
          </li>
          <li className="p-4 hover:bg-gray-700 transition duration-300">
            <Link to="/admin/teams" className="flex items-center space-x-3">
              <GroupsIcon />
              <span>Teams</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
