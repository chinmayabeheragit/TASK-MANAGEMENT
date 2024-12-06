import React, { useState } from "react";
import { Link } from "react-router-dom";

function CompletedTasks() {
  const [completedTasks, setCompletedTasks] = useState([
    {
      id: 1,
      taskName: "Project Report",
      taskStatus: "Completed",
      completedDate: "2024-12-01",
      attachments: ["file1.pdf", "file2.png"],
      employee: "John Doe",
    },
    {
      id: 2,
      taskName: "UI Design",
      taskStatus: "Completed",
      completedDate: "2024-12-02",
      attachments: ["design.jpg"],
      employee: "Jane Smith",
    },
  ]);
  const [trashNotification, setTrashNotification] = useState(null);

  // Function to handle task deletion
  const handleDeleteTask = (taskId) => {
    const deletedTask = completedTasks.find((task) => task.id === taskId);
    setCompletedTasks(completedTasks.filter((task) => task.id !== taskId));

    // Show trash notification
    setTrashNotification(`Task "${deletedTask.taskName}" has been moved to trash.`);
    setTimeout(() => setTrashNotification(null), 3000); // Hide notification after 3 seconds
  };

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Completed Tasks</h2>
        <Link
          to="/admin/dashboard"
          className="flex items-center text-gray-700 hover:text-yellow-500"
        >
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Go to Dashboard
          </button>
        </Link>
      </div>

      {/* Trash Notification */}
      {trashNotification && (
        <div className="bg-yellow-500 text-white p-4 rounded-md shadow-md mb-6">
          <p>{trashNotification}</p>
        </div>
      )}

      {/* Completed Tasks Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-left table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-gray-700">Task Name</th>
              <th className="p-3 text-gray-700">Employee</th>
              <th className="p-3 text-gray-700">Status</th>
              <th className="p-3 text-gray-700">Completed Date</th>
              <th className="p-3 text-gray-700">Attachments</th>
              <th className="p-3 text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {completedTasks.map((task) => (
              <tr key={task.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{task.taskName}</td>
                <td className="p-3">{task.employee}</td>
                <td className="p-3">
                  <span className="text-green-500">{task.taskStatus}</span>
                </td>
                <td className="p-3">{task.completedDate}</td>
                <td className="p-3">
                  <ul>
                    {task.attachments.map((attachment, index) => (
                      <li key={index}>
                        <a
                          href="#"
                          className="text-blue-500 hover:underline"
                        >
                          {attachment}
                        </a>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty state if no tasks */}
      {completedTasks.length === 0 && (
        <div className="mt-6 text-center">
          <p className="text-gray-500">No completed tasks available.</p>
        </div>
      )}
    </div>
  );
}

export default CompletedTasks;
