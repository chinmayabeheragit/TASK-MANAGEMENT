const taskService = require('../services/tasksService');
const response = require('../../commons/response/response');
const statusCode = require('../../commons/utils/statusCode') // Assuming you have a response utility to format responses

const createTask = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const task = await taskService.createTask(
      req.body.taskData,
      req.Name,
      session
    );
    await session.commitTransaction();
    return response.handleSuccessResponse(
      { result: statusCode.SUCCESS_CODE,task },
      res,
      'Task created successfully',
      'Task has been created.'
    );
  } catch (error) {
    await session.abortTransaction();
    return response.handleErrorResponse(
      {
        errorCode: statusCode.SERVER_ERROR,
        message: "internal server error"
      }
    );
  }
};

// Update a task
const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const updates = req.body;

    // Call the service to update the task
    const task = await taskService.updateTask(taskId, updates);

    return response.handleSuccessResponse(
      { result: task },
      res,
      'Task updated successfully',
      'Task has been updated.'
    );
  } catch (error) {
    return response.handleErrorResponse(error, res);
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    // Call the service to delete the task
    const task = await taskService.deleteTask(taskId);

    return response.handleSuccessResponse(
      { result: task },
      res,
      'Task deleted successfully',
      'Task has been deleted.'
    );
  } catch (error) {
    return response.handleErrorResponse(error, res);
  }
};

// Get all tasks (admin only)
const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();

    return response.handleSuccessResponse(
      { result: tasks },
      res,
      'Tasks retrieved successfully',
      'List of all tasks.'
    );
  } catch (error) {
    return response.handleErrorResponse(error, res);
  }
};

// Get tasks by member name
const getTasksByMember = async (req, res) => {
  try {
    const { memberName } = req.params;

    // Call the service to get tasks by member
    const tasks = await taskService.getTasksByMember(memberName);

    return response.handleSuccessResponse(
      { result: tasks },
      res,
      'Tasks retrieved successfully',
      'List of tasks for the member.'
    );
  } catch (error) {
    return response.handleErrorResponse(error, res);
  }
};

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         taskName:
 *           type: string
 *           description: The name of the task
 *         members:
 *           type: array
 *           items:
 *             type: string
 *           description: List of user names assigned to the task
 *         description:
 *           type: string
 *           description: A detailed description of the task
 *         startDate:
 *           type: string
 *           format: date
 *           description: The start date of the task
 *         deadlineDate:
 *           type: string
 *           format: date
 *           description: The deadline for the task
 *         status:
 *           type: string
 *           enum: [assigned, in progress, completed, pending]
 *           description: The current status of the task
 *         attachments:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               fileName:
 *                 type: string
 *                 description: Name of the attachment file
 */

/**
 * @swagger
 * /api/createtask:
 *   post:
 *     summary: Create a new task
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: Task created successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */


/**
 * @swagger
 * /api/tasks/{taskId}:
 *   put:
 *     summary: Update a task
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the task to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 *   delete:
 *     summary: Delete a task
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the task to delete
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/tasks/member/{memberName}:
 *   get:
 *     summary: Get tasks assigned to a specific member
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Member
 *     parameters:
 *       - in: path
 *         name: memberName
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the member whose tasks are to be retrieved
 *     responses:
 *       200:
 *         description: List of tasks assigned to the member
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Member not found
 *       500:
 *         description: Server error
 */


module.exports = {
  createTask,
  updateTask,
  deleteTask,
  getAllTasks,
  getTasksByMember
};
