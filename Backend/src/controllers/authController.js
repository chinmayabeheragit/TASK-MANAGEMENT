const authService = require('../services/authService');
const response = require('../../commons/response/response');
const customException = require('../../commons/exception/exception');
const statusCode = require('../../commons/utils/statusCode');
const mongoose = require("mongoose")

// Register User
const registerUser = async (req, res) => {
    try {
        const userData = req.body;
        const newUser = await authService.registerUser(userData);
        
        return response.handleSuccessResponse(
            {
                successCode: statusCode.SUCCESS_CODE,
                result: newUser,
            },
            res,
            'Registration successful',
            'User has been registered and is awaiting admin approval.'
        );
    } catch (error) {
        return response.handleErrorResponse(error, res);
    }
};

const approveUser = async (req, res) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        let { accId, status } = req.params; // Destructure params
        status = status.trim().toLowerCase(); // Ensure the status is trimmed and in lowercase

        // Validate `status` before proceeding
        const result = await authService.updateUserStatus(accId, status, session);

        await session.commitTransaction();
        return response.handleSuccessResponse(
            { successCode: statusCode.SUCCESS_CODE, result },
            res,
            "Order status updated successfully",
            "The order status has been updated in the database successfully."
        );
    } catch (error) {
        console.error(error);
        if (error.errorCode) {
            return response.handleErrorResponse(error, res);
        }
        await session.abortTransaction();
        return response.handleErrorResponse(
            {
                errorCode: statusCode.SERVER_ERROR,
                message: "Unable to update order status",
            },
            res
        );
    } finally {
        session.endSession();
    }
};



// User Login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Call the login service to fetch the user and generate a new token
        const { user, token } = await authService.loginUser(email, password);

        return response.handleSuccessResponse(
            {
                successCode: statusCode.SUCCESS_CODE,
                result: { user, token },
            },
            res,
            'Login successful',
            'User logged in successfully.'
        );
    } catch (error) {
        return response.handleErrorResponse(error, res);
    }
};

// Password Reset Request
const resetPasswordRequest = async (req, res) => {
    try {
        const { email } = req.body;
        const message = await authService.resetPasswordRequest(email);

        return response.handleSuccessResponse(
            {
                successCode: statusCode.SUCCESS_CODE,
                result: message,
            },
            res,
            'Password reset request',
            'Password reset email has been sent.'
        );
    } catch (error) {
        return response.handleErrorResponse(error, res);
    }
};

module.exports = {
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a user. The predefined email will register as an admin; all others will register as users.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Full name of the user
 *               email:
 *                 type: string
 *                 description: Email address of the user
 *               password:
 *                 type: string
 *                 description: Password for the user
 *     responses:
 *       201:
 *         description: Registration successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successCode:
 *                   type: integer
 *                 result:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *                       enum: [user, admin]
 *                     status:
 *                       type: string
 *                       enum: [pending, approved]
 *       400:
 *         description: Bad request, user already exists
 */

   registerUser,

    approveUser,
   /**
 * @swagger
 * /api/auth/approve/{accId}/{status}:
 *   put:
 *     summary: Admin approve or reject user
 *     description: Admin approves or rejects a user by email.
 *     tags:
 *       - Authentication
 *     parameters:
 *       - name: accId
 *         in: "path"
 *         required: true
 *         description: The email of the user to approve/reject
 *         schema:
 *           type: string
 *       - name: status
 *         in: "path"
 *         required: true
 *         description: The status to set for the user (approved or reject)
 *         schema:
 *           type: string
 *           enum: [approved, reject]
 *     responses:
 *       200:
 *         description: User status updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 httpStatusCode:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 displayMessage:
 *                   type: string
 *                 result:
 *                   type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         name:
 *                           type: string
 *                         email:
 *                           type: string
 *                         status:
 *                           type: string
 *       400:
 *         description: Invalid status
 *       404:
 *         description: User not found
 */




    loginUser,
   /**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     description: Logs in a user and returns a JWT token with user details.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successCode:
 *                   type: integer
 *                 result:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         name:
 *                           type: string
 *                         email:
 *                           type: string
 *                         role:
 *                           type: string
 *                         status:
 *                           type: string
 *                     token:
 *                       type: string
 *                       description: JWT token containing user details
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */

    resetPasswordRequest,
    /**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Password reset request
 *     description: Request a password reset email by providing an email address.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset email sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Email not found
 */
};
