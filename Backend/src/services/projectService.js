const customException = require('../../commons/exception/exception');
const projectQuery = require('../queries/projectQuery');
const statusCode = require('../../commons/utils/statusCode');

const createProject = async (body, session) => {
    try {
        const result = await projectQuery.createProject(body, session);
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createProject
}