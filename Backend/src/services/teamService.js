const customException = require('../../commons/exception/exception');
const teamsQuery = require('../queries/teamsQuery');
const statusCode = require('../../commons/utils/statusCode');

const createTeam = async (body, session) => {
    try {
        const result = await teamsQuery.createTeam(body, session);
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createTeam
}