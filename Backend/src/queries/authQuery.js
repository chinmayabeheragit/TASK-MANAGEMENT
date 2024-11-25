const User = require('../models/userModel');
const customException = require('../../commons/exception/exception');
const statusCode = require('../../commons/utils/statusCode');

// Fetch a user by email for login
const fetchUserByEmail = async (email) => {
    return await User.findOne({ email });
};

const createUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
};

const getAccountById = async (accId, session) => {
    try {
        const account = await User.findOne({ _id: accId }).session(session); // Use `findOne` instead of `findById` for custom IDs
        return account;
    } catch (error) {
        console.error('Error in getAccountById query:', error.message);
        throw error;
    }
};

const updateUserStatus = async (accId, status, session) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: accId },
            { $set: { status } }, // Directly set `status` as passed
            { session, new: true } // Ensure session and return the updated document
        );

        if (!updatedUser) {
            throw customException.error(
                statusCode.NOT_FOUND,
                "Profile not found",
                "A profile with this id does not exist"
            );
        }

        return updatedUser;
    } catch (error) {
        console.error('Error in updateUserStatus query:', error.message);
        throw error;
    }
};






module.exports = {
    fetchUserByEmail,
    updateUserStatus,
    createUser,
    getAccountById
};
