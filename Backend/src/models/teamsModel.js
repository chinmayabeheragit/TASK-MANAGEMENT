const mongoose = require("mongoose");
const shortid = require("shortid");

const teamSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => `TEAM-${shortid.generate()}`,
        },
        teamName: {
            type: String,
            required: true,
            trim: true,
        },
        projectName: {
            type: String,
            required: true,
            trim: true,
        },
        teamMembers: [
            {
                type: String, // Store team member names or unique identifiers (e.g., emails or IDs)
                required: true,
            },
        ],
        teamDescription: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

const Team = mongoose.model("Team", teamSchema);

module.exports = { Team };
