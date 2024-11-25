const { Project } = require('../models/projectModel');

const createProject = async (projectData, session) => {
    try {
        const newProject = new Project(projectData); // Use 'Project' (not 'project') as the constructor
        await newProject.save({ session }); // Save the project with the session
        return newProject;
    } catch (error) {
        throw error;
    }
};

const findProjectByEmail = async (email, session) => {
    try {
        return await Project.findOne({email}).session(session).exec();
    } catch (error) {
        throw error
    }
}

module.exports = {
    createProject,
    findProjectByEmail
}
