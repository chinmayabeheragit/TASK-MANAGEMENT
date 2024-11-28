import React, { useState, useEffect } from "react";
import AdminLayout from "../../layouts/AdminLayout";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalTasksAssigned: 0,
    totalTasksCompleted: 0,
    totalEmployees: 0,
    totalProjects: 0,
    monthlyTaskData: [],
    monthlyProjectData: [],
    monthlyEmployeeData: [],
    taskList: [],
    notifications: [],
  });

  useEffect(() => {
    // Fetch dashboard data from API
    const fetchDashboardData = async () => {
      try {
        const response = await fetch("/api/admin/dashboard");
        const data = await response.json();
        setDashboardData(data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-bold">Tasks Assigned</h2>
          <p className="text-2xl">{dashboardData.totalTasksAssigned}</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-bold">Tasks Completed</h2>
          <p className="text-2xl">{dashboardData.totalTasksCompleted}</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-bold">Employees</h2>
          <p className="text-2xl">{dashboardData.totalEmployees}</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-bold">Projects</h2>
          <p className="text-2xl">{dashboardData.totalProjects}</p>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Tasks List</h2>
        <div className="bg-white shadow rounded overflow-hidden">
          <table className="table-auto w-full text-left">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-4">Task Name</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.taskList.map((task) => (
                <tr key={task.id} className="border-b">
                  <td className="p-4">{task.name}</td>
                  <td className="p-4">{task.status}</td>
                  <td className="p-4">
                    <button className="text-blue-500">More</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Notifications</h2>
        <div className="bg-white shadow rounded p-4">
          <ul>
            {dashboardData.notifications.map((notification, index) => (
              <li key={index} className="border-b py-2">
                {notification}
              </li>
            ))}
          </ul>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
            Mark All Read
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
