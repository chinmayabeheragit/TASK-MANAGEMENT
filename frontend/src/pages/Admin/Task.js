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
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link } from "react-router-dom";

const statuses = [
  { value: "ToDo", color: "bg-yellow-200 text-yellow-800" },
  { value: "Pending", color: "bg-orange-200 text-orange-800" },
  { value: "Completed", color: "bg-green-200 text-green-800" },
  { value: "InProgress", color: "bg-blue-200 text-blue-800" },
  { value: "NotCompleted", color: "bg-red-200 text-red-800" },
];

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    taskName: "",
    projectName: "",
    teamName: "",
    assignTo: "",
    status: "",
    priority: "",
    startDate: "",
    endDate: "",
    description: "",
    techStack: "",
    attachments: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleCreateTask = () => {
    setTasks([...tasks, { ...newTask, id: Date.now() }]);
    setNewTask({
      taskName: "",
      projectName: "",
      teamName: "",
      assignTo: "",
      status: "",
      priority: "",
      startDate: "",
      endDate: "",
      description: "",
      techStack: "",
      attachments: "",
    });
    setTaskFormOpen(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Task Management</h1>
        <Link to="/admin/dashboard" className="flex items-center text-black hover:text-yellow-300">
          <Button
            variant="outlined"
            startIcon={<DashboardIcon />}
            className="text-black border-black hover:border-yellow-300 hover:text-yellow-300"
          >
            Dashboard
          </Button>
        </Link>
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setTaskFormOpen(true)}
      >
        Create Task
      </Button>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            statuses={statuses}
            onDelete={(id) => setTasks(tasks.filter((t) => t.id !== id))}
          />
        ))}
      </div>

      {/* Task Creation Form */}
      <Dialog open={taskFormOpen} onClose={() => setTaskFormOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Create Task</DialogTitle>
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
              label="Project Name"
              name="projectName"
              select
              fullWidth
              value={newTask.projectName}
              onChange={handleInputChange}
            >
              <MenuItem value="Project A">Project A</MenuItem>
              <MenuItem value="Project B">Project B</MenuItem>
            </TextField>
            <TextField
              label="Team Name"
              name="teamName"
              select
              fullWidth
              value={newTask.teamName}
              onChange={handleInputChange}
            >
              <MenuItem value="Team X">Team X</MenuItem>
              <MenuItem value="Team Y">Team Y</MenuItem>
            </TextField>
            <TextField
              label="Assign To"
              name="assignTo"
              fullWidth
              value={newTask.assignTo}
              onChange={handleInputChange}
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
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </TextField>
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
              label="Description"
              name="description"
              multiline
              rows={3}
              fullWidth
              value={newTask.description}
              onChange={handleInputChange}
            />
            <TextField
              label="Tech Stack"
              name="techStack"
              fullWidth
              value={newTask.techStack}
              onChange={handleInputChange}
            />
            <TextField
              label="Attachments"
              name="attachments"
              fullWidth
              value={newTask.attachments}
              onChange={handleInputChange}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTaskFormOpen(false)}>Cancel</Button>
          <Button onClick={handleCreateTask} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const TaskCard = ({ task, onDelete, statuses }) => {
  const [showMore, setShowMore] = useState(false);
  const statusColor =
    statuses.find((status) => status.value === task.status)?.color || "";

  return (
    <div className="border p-4 rounded-lg shadow bg-white">
      <Typography variant="h6" className="mb-2">
        {task.taskName}
      </Typography>
      <p className={`text-sm ${statusColor}`}>{task.status}</p>
      <p className="text-sm text-gray-600">
        {task.startDate} - {task.endDate}
      </p>
      <Button onClick={() => setShowMore(true)}>More</Button>
      <Dialog open={showMore} onClose={() => setShowMore(false)}>
        <DialogTitle>Task Details</DialogTitle>
        <DialogContent>
          <Typography variant="body2">{task.description}</Typography>
          <Typography variant="body2">{task.techStack}</Typography>
          <Typography variant="body2">{task.attachments}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowMore(false)}>Close</Button>
        </DialogActions>
      </Dialog>
      <div className="flex space-x-2 mt-4">
        <Button variant="outlined" color="primary">
          Update
        </Button>
        <Button variant="outlined" color="secondary" onClick={() => onDelete(task.id)}>
          Delete
        </Button>
        <Button variant="contained" color="warning">
          Reminder
        </Button>
      </div>
    </div>
  );
};

export default TaskPage;
