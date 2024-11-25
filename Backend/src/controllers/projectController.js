const projectService = require('../services/projectService')
const mongoose = require("mongoose");
const statusCode = require('../../commons/utils/statusCode')
const response = require('../../commons/response/response')


const createProject = async (req,res) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const result = await projectService.createProject(
            req.body,
            session
        );
        await session.commitTransaction();
        return response.handleSuccessResponse(
            {
                successCode: statusCode.SUCCESS_CODE, result
            },
            res,
            "project created successfully"
        )
    } catch (error) {
        console.log(error)
        if (error.errorCode) {
            return response.handleErrorResponse(error, res)
        }
        await session.abortTransaction();
        return response.handleErrorResponse(
            {
                errorCode: statusCode.SERVER_ERROR,
                message: "unable to create the project",
            },
            res
        );
    } finally {
        session.endSession();
    }
}

module.exports = {
    createProject,
    /**
 * @swagger
 * /project/create-project:
 *   post:
 *     summary: Create a new project
 *     tags:
 *       - Projects
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               projectName:
 *                 type: string
 *                 description: Name of the project
 *                 example: "Task Management System"
 *               description:
 *                 type: string
 *                 description: Description of the project
 *                 example: "A system to manage tasks effectively"
 *               onboardTime:
 *                 type: string
 *                 description: Onboard time of the project (ISO format recommended)
 *                 example: "2024-11-22T10:00:00Z"
 *               deadline:
 *                 type: string
 *                 description: Deadline for the project (ISO format recommended)
 *                 example: "2025-01-15T18:00:00Z"
 *     responses:
 *       201:
 *         description: Project created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 httpStatusCode:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: "project created successfully"
 *                 result:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "TASKMANAGEMENT-12345"
 *                     projectName:
 *                       type: string
 *                       example: "Task Management System"
 *                     description:
 *                       type: string
 *                       example: "A system to manage tasks effectively"
 *                     onboardTime:
 *                       type: string
 *                       example: "2024-11-22T10:00:00Z"
 *                     deadline:
 *                       type: string
 *                       example: "2025-01-15T18:00:00Z"
 *                     createdAt:
 *                       type: string
 *                       example: "2024-11-22T10:10:00Z"
 *                     updatedAt:
 *                       type: string
 *                       example: "2024-11-22T10:10:00Z"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 httpStatusCode:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Invalid input"
 *                 errorDetails:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Project name is required"]
 *       409:
 *         description: Conflict (Duplicate Project)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 httpStatusCode:
 *                   type: integer
 *                   example: 409
 *                 message:
 *                   type: string
 *                   example: "project already exists"
 *                 displayMessage:
 *                   type: string
 *                   example: "a project using this email already exists"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 httpStatusCode:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "unable to create the project"
 */

}