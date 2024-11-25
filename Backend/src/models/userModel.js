const mongoose = require('mongoose');
const shortid = require('shortid');

const userSchema = new mongoose.Schema(
    {
        _id: {
             type: String,
            default: () => `TASKMANAGEMENT-${ shortid.generate()}`
         }, 
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ['user', 'admin'], default: 'user' },
        status: { 
            type: String, 
            enum: ['pending', 'approved', 'reject'], // Add "reject" as an option
            default: 'pending' 
        }, 
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
