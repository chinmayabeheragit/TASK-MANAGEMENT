const {Team} = require('../models/teamsModel')

const createTeam = async (teamData, session) => {
    try {
        const newTeam = new Team(teamData); // Use 'Project' (not 'project') as the constructor
        await newTeam.save({ session }); // Save the project with the session
        return newTeam;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createTeam
}