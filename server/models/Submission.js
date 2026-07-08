const mongoose = require('mongoose');
const submissionSchema = new mongoose.Schema(
  {
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    },
    talentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    fileUrl: {
      type: String,
    },
    notes: {
      type: String,
    },
    reviewStatus: {
      type: String,
      default: 'Pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Submission', submissionSchema);
