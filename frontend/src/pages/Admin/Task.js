import React, { useState } from "react";
import {
  Button,
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Autocomplete,
} from "@mui/material";
import { Delete, Notifications, Edit } from "@mui/icons-material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link } from "react-router-dom";

const statuses = [
  { value: "ToDo", color: "bg-yellow-200 text-yellow-800" },
  { value: "Pending", color: "bg-orange-200 text-orange-800" },
  { value: "Completed", color: "bg-green-200 text-green-800" },
  { value: "InProgress", color: "bg-blue-200 text-blue-800" },
  { value: "NotCompleted", color: "bg-red-200 text-red-800" },
];

const priorities = ["High", "Medium", "Low"];
const projects = ["Project A", "Project B", "Project C"];
const teams = ["Team X", "Team Y", "Team Z"];
const users = ["Alice", "Bob", "Charlie", "David"];

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null); // New State for editing
  const [newTask, setNewTask] = useState({
    taskName: "",
    description: "", // Added description field
    startDate: "",
    endDate: "",
    projectName: "",
    teamName: "",
    assignTo: [],
    status: "",
    priority: "",
    attachments: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleCreateOrUpdateTask = () => {
    if (editTaskId) {
      // Update Task
      setTasks(
        tasks.map((task) =>
          task.id === editTaskId ? { ...task, ...newTask } : task
        )
      );
      alert("Task updated successfully!");
    } else {
      // Create New Task
      setTasks([...tasks, { ...newTask, id: Date.now() }]);
    }
    resetTaskForm();
  };

  const handleEditTask = (task) => {
    setEditTaskId(task.id);
    setNewTask(task);
    setTaskFormOpen(true);
  };

  const resetTaskForm = () => {
    setEditTaskId(null);
    setNewTask({
      taskName: "",
      description: "",
      startDate: "",
      endDate: "",
      projectName: "",
      teamName: "",
      assignTo: [],
      status: "",
      priority: "",
      attachments: null,
    });
    setTaskFormOpen(false);
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    alert("Task moved to trash!");
  };

  return (
    <div className="p-6 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Task Management</h1>
        <Link
          to="/admin/dashboard"
          className="flex items-center text-gray-700 hover:text-yellow-500"
        >
          <Button
            variant="outlined"
            startIcon={<DashboardIcon />}
            className="text-gray-800 border-gray-800 hover:border-yellow-500 hover:text-yellow-500"
          >
            Dashboard
          </Button>
        </Link>
      </div>

      {/* Create Task Button */}
      <Button
        variant="contained"
        color="primary"
        className="bg-blue-500 hover:bg-blue-600"
        onClick={() => setTaskFormOpen(true)}
      >
        Create Task
      </Button>

      {/* Task Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="border p-4 rounded-lg shadow-lg bg-white"
          >
            <Typography variant="h6" className="font-bold text-gray-800">
              {task.taskName}
            </Typography>
            <p className="text-sm text-gray-600">{task.description}</p>
            <p className="text-sm text-gray-600">
              {task.startDate} - {task.endDate}
            </p>
            <p
              className={`text-sm ${
                statuses.find((s) => s.value === task.status)?.color
              }`}
            >
              {task.status}
            </p>
            <p className="text-sm text-gray-700">Priority: {task.priority}</p>
            <p className="text-sm text-gray-600">Project: {task.projectName}</p>
            <p className="text-sm text-gray-600">Team: {task.teamName}</p>
            <p className="text-sm text-gray-600">
              Assigned To: {task.assignTo.join(", ")}
            </p>
            <div className="flex space-x-3 mt-4">
              <Button
                variant="outlined"
                startIcon={<Edit />}
                className="text-green-500 border-green-500"
                onClick={() => handleEditTask(task)}
              >
                Update
              </Button>
              <Button
                variant="outlined"
                startIcon={<Delete />}
                className="text-red-500 border-red-500"
                onClick={() => handleDeleteTask(task.id)}
              >
                Delete
              </Button>
              <Button
                variant="contained"
                startIcon={<Notifications />}
                className="bg-yellow-500 hover:bg-yellow-600"
              >
                Reminder
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Task Creation/Update Dialog */}
      <Dialog
        open={taskFormOpen}
        onClose={resetTaskForm}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>{editTaskId ? "Update Task" : "Create Task"}</DialogTitle>
        <DialogContent>
          <div className="space-y-4">
            <TextField
              label="Task Name"
              name="taskName"
              fullWidth
              value={newTask.taskName}
              onChange={handleInputChange}
            />
            <TextField
              label="Description"
              name="description"
              fullWidth
              multiline
              rows={4}
              value={newTask.description}
              onChange={handleInputChange}
            />
            <TextField
              label="Start Date"
              name="startDate"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={newTask.startDate}
              onChange={handleInputChange}
            />
            <TextField
              label="End Date"
              name="endDate"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={newTask.endDate}
              onChange={handleInputChange}
            />
            <TextField
              label="Project Name"
              name="projectName"
              select
              fullWidth
              value={newTask.projectName}
              onChange={handleInputChange}
            >
              {projects.map((project) => (
                <MenuItem key={project} value={project}>
                  {project}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Team Name"
              name="teamName"
              select
              fullWidth
              value={newTask.teamName}
              onChange={handleInputChange}
            >
              {teams.map((team) => (
                <MenuItem key={team} value={team}>
                  {team}
                </MenuItem>
              ))}
            </TextField>
            <Autocomplete
              multiple
              options={users}
              value={newTask.assignTo}
              onChange={(e, value) => setNewTask({ ...newTask, assignTo: value })}
              renderInput={(params) => (
                <TextField {...params} label="Assign To" fullWidth />
              )}
            />
            <TextField
              label="Status"
              name="status"
              select
              fullWidth
              value={newTask.status}
              onChange={handleInputChange}
            >
              {statuses.map((status) => (
                <MenuItem key={status.value} value={status.value}>
                  {status.value}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Priority"
              name="priority"
              select
              fullWidth
              value={newTask.priority}
              onChange={handleInputChange}
            >
              {priorities.map((priority) => (
                <MenuItem key={priority} value={priority}>
                  {priority}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Attachments"
              name="attachments"
              type="file"
              fullWidth
              InputLabelProps={{ shrink: true }}
              onChange={(e) =>
                setNewTask({ ...newTask, attachments: e.target.files[0] })
              }
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={resetTaskForm} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleCreateOrUpdateTask}
            color="primary"
            variant="contained"
          >
            {editTaskId ? "Update Task" : "Create Task"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TaskPage;
