const bodyParser = require('body-parser');
const Task = require('../models/tasksModel');
const User = require('../models/userModel'); // Assuming we have a User model

const createTask = async (taskData, Name, session) => {
  try{
    bodyParser.email = Name
  const members = await User.find({ _id: { $in: taskData.members } });

  if (members.some(member => member.status !== 'approved')) {
    throw new Error('All members must be approved to assign the task.');
  }
  const task = new Task(taskData);
  return await task.save();
} catch (error) {
  throw error;
}
};


const updateTask = async (taskId, updates) => {
  // Find the task and update it
  const task = await Task.findByIdAndUpdate(taskId, updates, { new: true });
  
  if (!task) {
    throw new Error('Task not found.');
  }

  return task;
};

// Delete a task
const deleteTask = async (taskId) => {
  const task = await Task.findByIdAndDelete(taskId);
  
  if (!task) {
    throw new Error('Task not found.');
  }

  return task;
};

// Get all tasks (admin only)
const getAllTasks = async () => {
  return await Task.find();
};

// Get tasks by member name
const getTasksByMember = async (memberName) => {
  return await Task.find({ 'members': memberName });
};

module.exports = {
  createTask,
  updateTask,
  deleteTask,
  getAllTasks,
  getTasksByMember
};
