import React, { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Button } from "@mui/material";
// import NotificationsIcon from "@mui/icons-material/Notifications";
import TaskIcon from "@mui/icons-material/Assignment";
import PeopleIcon from "@mui/icons-material/People";
import BusinessIcon from "@mui/icons-material/Business";
import EventNoteIcon from "@mui/icons-material/EventNote";  // Task icon
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";  // Notification icon
import { Avatar } from "@mui/material";

const Dashboard = () => {
  const [dashboardData] = useState({
    totalTasksAssigned: 10,
    totalTasksCompleted: 2,
    totalEmployees: 5,
    totalProjects: 3,
    monthlyTaskData: [
      { month: "Jan", tasks: 10 },
      { month: "Feb", tasks: 20 },
      { month: "Mar", tasks: 15 },
      { month: "Apr", tasks: 18 },
      { month: "May", tasks: 12 },
      { month: "Jun", tasks: 25 },
      { month: "Jul", tasks: 30 },
      { month: "Aug", tasks: 8 },
      { month: "Sep", tasks: 13 },
      { month: "Oct", tasks: 19 },
      { month: "Nov", tasks: 16 },
      { month: "Dec", tasks: 22 },
    ],
    monthlyProjectData: [
      { month: "Jan", projects: 2 },
      { month: "Feb", projects: 4 },
      { month: "Mar", projects: 3 },
      { month: "Apr", projects: 5 },
      { month: "May", projects: 3 },
      { month: "Jun", projects: 4 },
      { month: "Jul", projects: 6 },
      { month: "Aug", projects: 2 },
      { month: "Sep", projects: 4 },
      { month: "Oct", projects: 3 },
      { month: "Nov", projects: 5 },
      { month: "Dec", projects: 4 },
    ],
    monthlyEmployeeData: [
      { month: "Jan", employees: 5 },
      { month: "Feb", employees: 6 },
      { month: "Mar", employees: 7 },
      { month: "Apr", employees: 8 },
      { month: "May", employees: 9 },
      { month: "Jun", employees: 9 },
      { month: "Jul", employees: 10 },
      { month: "Aug", employees: 10 },
      { month: "Sep", employees: 11 },
      { month: "Oct", employees: 12 },
      { month: "Nov", employees: 12 },
      { month: "Dec", employees: 13 },
    ],
    taskList: [
      { id: 1, name: "Task 1", status: "Pending" },
      { id: 2, name: "Task 2", status: "Completed" },
      { id: 3, name: "Task 3", status: "In Progress" },
    ],
    notifications: [
      "Employee A completed Task X",
      "Employee B joined Project Y",
      "New project onboarded: Project Z",
    ],
    runningProjects: [
      {
        projectName: "Project A",
        projectStatus: "In Progress",
        employees: [
          { name: "John", profilePic: "/images/john.jpg" },
          { name: "Jane", profilePic: "/images/jane.jpg" },
        ],
      },
      {
        projectName: "Project B",
        projectStatus: "Completed",
        employees: [
          { name: "Alice", profilePic: "/images/alice.jpg" },
          { name: "Bob", profilePic: "/images/bob.jpg" },
        ],
      },
    ],
  });

  const taskCompletionPercentage = (dashboardData.totalTasksCompleted / dashboardData.totalTasksAssigned) * 100;

  const getTaskStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-500";
      case "In Progress":
        return "bg-yellow-500";
      case "Pending":
        return "bg-red-500";
      default:
        return "";
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 bg-gray-100 min-h-screen relative">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[{
              title: "Tasks Assigned",
              count: dashboardData.totalTasksAssigned,
              color: "from-green-400 to-blue-500",
              icon: <TaskIcon />,
            },
            {
              title: "Tasks Completed",
              count: dashboardData.totalTasksCompleted,
              color: "from-pink-400 to-red-500",
              progress: true,
              icon: <EventNoteIcon />,
            },
            {
              title: "Employees",
              count: dashboardData.totalEmployees,
              color: "from-yellow-400 to-orange-500",
              icon: <PeopleIcon />,
            },
            {
              title: "Projects",
              count: dashboardData.totalProjects,
              color: "from-purple-400 to-indigo-500",
              icon: <BusinessIcon />,
            }
          ].map((item, index) => (
            <div
              key={index}
              className={`bg-gradient-to-r ${item.color} text-white p-6 rounded-xl shadow-xl text-center hover:scale-105 transition-transform`}
            >
              <div className="flex justify-center mb-4">
                <span className="text-3xl">{item.icon}</span>
              </div>
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-3xl font-bold">{item.count}</p>
              {item.progress && (
                <div className="mt-4">
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-sm font-semibold uppercase text-white">Progress</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold inline-block py-1 text-white">
                          {Math.round(taskCompletionPercentage)}%
                        </span>
                      </div>
                    </div>
                    <div className="flex mb-2">
                      <div className="w-full">
                        <div className="relative flex mb-2">
                          <div className="flex-grow border-2 border-blue-400 rounded">
                            <div
                              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-400"
                              style={{ width: `${taskCompletionPercentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Graphs Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Tasks Graph */}
          <div className="bg-white p-6 rounded-xl shadow-xl">
            <h3 className="text-lg font-semibold mb-4">Monthly Tasks</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={dashboardData.monthlyTaskData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="tasks" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Monthly Projects Graph */}
          <div className="bg-white p-6 rounded-xl shadow-xl">
            <h3 className="text-lg font-semibold mb-4">Monthly Projects</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={dashboardData.monthlyProjectData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="projects" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Monthly Employees Graph */}
          <div className="bg-white p-6 rounded-xl shadow-xl">
            <h3 className="text-lg font-semibold mb-4">Monthly Employees</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={dashboardData.monthlyEmployeeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="employees" stroke="#ff7300" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Task List Section */}
        <div className="bg-white p-6 rounded-xl shadow-xl">
          <h3 className="text-lg font-semibold mb-4">Task List</h3>
          <ul>
            {dashboardData.taskList.map((task) => (
              <li key={task.id} className="flex justify-between items-center py-3 border-b border-gray-200">
                <div className="flex items-center">
                  <span className={`p-2 rounded-full text-white ${getTaskStatusColor(task.status)}`}>
                    <TaskIcon />
                  </span>
                  <span className="ml-3 text-sm">{task.name}</span>
                </div>
                <span className="text-xs">{task.status}</span>
              </li>
            ))}
          </ul>
          <Button
            variant="outlined"
            color="primary"
            className="mt-4 hover:bg-blue-500 hover:text-white transition-all"
            onClick={() => alert("More tasks...")}
          >
            More
          </Button>
        </div>

        {/* Notification Section */}
        <div className="bg-white p-6 rounded-xl shadow-xl mt-8">
          <h3 className="text-lg font-semibold mb-4">Notifications</h3>
          <ul>
            {dashboardData.notifications.map((notification, index) => (
              <li key={index} className="py-2 flex items-center space-x-3">
                <NotificationImportantIcon />
                <span className="text-sm">{notification}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex space-x-4">
            <Button
              variant="contained"
              color="secondary"
              className="hover:bg-green-600 transition-all"
              onClick={() => alert("All notifications read")}
            >
              Read All
            </Button>
            <Button
              variant="outlined"
              color="primary"
              className="hover:bg-blue-500 hover:text-white transition-all"
              onClick={() => alert("Redirecting to notifications")}
            >
              More
            </Button>
          </div>
        </div>

        {/* Running Projects Section */}
        <div className="bg-white p-6 rounded-xl shadow-xl mt-8">
          <h3 className="text-lg font-semibold mb-4">Running Projects</h3>
          {dashboardData.runningProjects.map((project, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between">
                <div>
                  <h4 className="text-xl font-semibold">{project.projectName}</h4>
                  <p className="text-sm text-gray-500">{project.projectStatus}</p>
                </div>
                <div className="flex space-x-3">
                  {project.employees.map((employee, idx) => (
                    <Avatar key={idx} alt={employee.name} src={employee.profilePic} />
                  ))}
                </div>
              </div>
            </div>
          ))}
          <Button
            variant="outlined"
            color="primary"
            className="mt-4 hover:bg-blue-500 hover:text-white transition-all"
            onClick={() => alert("More projects...")}
          >
            More
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
