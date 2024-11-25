const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const customException = require('../../commons/exception/exception');
const statusCode = require('../../commons/utils/statusCode');
const authQuery = require('../queries/authQuery');
const generateAuthToken = require('../../commons/utils/generateToken');
const sendEmail = require('../../commons/utils/sendEmail');

const adminEmail = 'chinmayabehera891@gmail.com';

const registerUser = async (userData) => {
    const { email, password } = userData;
    const existingUser = await authQuery.fetchUserByEmail(email);
    if (existingUser) {
        throw customException.error(
            statusCode.BAD_REQUEST,
            'User already exists',
            'An account with this email already exists.'
        );
    }

    // Determine role and status
    let role = 'user';
    let status = 'pending'; // Default status for users

    if (email === adminEmail) {
        role = 'admin';
        status = 'approved'; // Admin accounts are directly approved
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to database
    const newUser = await authQuery.createUser({
        ...userData,
        password: hashedPassword,
        role,
        status,
    });

    return newUser;
};

const updateUserStatus = async (accId, status, session) => {
    try {
        const cleanStatus = status.trim();

        const updatedUser = await authQuery.updateUserStatus(accId, cleanStatus, session);
        const emailMessage = `Your account status has been updated to "${cleanStatus}". Congratulations, you are now a member of Task Management!`;
        await sendEmail(updatedUser.email, 'Account Status Updated', emailMessage);

        return updatedUser;
    } catch (error) {
        console.error('Error in updateUserStatus service:', error.message);
        throw error;
    }
};

const loginUser = async (email, password) => {

    const user = await authQuery.fetchUserByEmail(email);

    // Check if the user exists
    if (!user) {
        throw new Error('User not found');
    }

    // Check if the user is approved
    if (user.status !== 'approved') {
        throw new Error('Your account is awaiting approval.');
    }

    // Compare the password provided with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new Error('Incorrect email or password.');
    }

    // Generate a new JWT token every time the user logs in
    const role = user.role;

    const token = await generateAuthToken.generateToken( email, role);

    return { user, token };
};

const resetPasswordRequest = async (email) => {
    const user = await authQuery.fetchUserByEmail(email);
    await sendEmail(email, 'Password Reset Request', 'Click the link below to reset your password: <Reset Link>');
    return 'Password reset email sent.';
};

module.exports = {
    registerUser,
    updateUserStatus,
    loginUser,
    resetPasswordRequest,
};
