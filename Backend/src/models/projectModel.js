const mongoose = require('mongoose');
const shortid = require('shortid')

const projectSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
           default: () => `TASKMANAGEMENT-${ shortid.generate()}`
        }, 
        projectName: {
            type: String,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        onboardTime: {
            type: String, // Store date and time as a string
        },
        deadline: {
            type: String, // Store date and time as a string
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt
    }
);

const Project = mongoose.model('Project', projectSchema);

module.exports = {Project};
