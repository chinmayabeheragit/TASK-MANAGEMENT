const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    taskName: { type: String, required: true },
    members: [
      {
        type: mongoose.Schema.Types.String, // Store only the username of approved users
        ref: 'User'
      }
    ],
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    deadlineDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ['assigned', 'in progress', 'completed', 'pending'],
      default: 'assigned'
    },
    attachments: [
      {
        fileName: { type: String },
        fileUrl: { type: String }, // URL to the uploaded file
        fileType: { type: String } // Type of file (pdf, image, doc, etc.)
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);
