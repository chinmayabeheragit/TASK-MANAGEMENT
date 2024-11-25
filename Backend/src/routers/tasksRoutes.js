const express = require('express');
const taskController = require('../controllers/tasksController');
const authMiddleware = require('../middleware/auth'); // Assuming you have an auth middleware for verifying JWT
const router = express.Router();

// Admin routes
router.post('/createtask', taskController.createTask); // Admin can create tasks
router.put('/updatetask/:taskId', authMiddleware, taskController.updateTask); // Admin can update tasks
router.delete('/deletetask/:taskId', authMiddleware, taskController.deleteTask); // Admin can delete tasks
router.get('/viewalltask', authMiddleware, taskController.getAllTasks); // Admin can view all tasks

// Member-specific routes
router.get('/tasks/member/:memberName', authMiddleware, taskController.getTasksByMember); // Users can view their tasks

module.exports = router;
