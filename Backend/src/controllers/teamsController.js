const mongoose = require("mongoose");
const statusCode = require('../../commons/utils/statusCode')
const response = require('../../commons/response/response')
const teamService = require('../services/teamService');

const createTeam = async (req,res) => {
    const session = await mongoose.startSession();
    try{
        session.startTransaction();
        const result = await teamService.createTeam(
            req.body,
            session
        );
        await session.commitTransaction();
        return response.handleErrorResponse(
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
    createTeam,
    
}