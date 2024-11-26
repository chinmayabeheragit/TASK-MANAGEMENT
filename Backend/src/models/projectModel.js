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
            type: String, 
        },
        deadline: {
            type: String, 
        },
    },
    {
        timestamps: true, 
    }
);

const Project = mongoose.model('Project', projectSchema);

module.exports = {Project};
