const Submission = require('../models/Submission');
const Task = require('../models/Task');

// @desc  Submit a task with a file upload
// @route POST /api/submissions/:taskId
// @access Talent
const submitTask = async (req, res) => {
  const { taskId } = req.params;
  const { notes } = req.body;

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Only the assigned Talent (or Admin) can submit
    if (req.user.role !== 'Admin' && (!task.assignedTo || task.assignedTo.toString() !== req.user._id.toString())) {
      return res.status(403).json({ message: 'Access denied: You can only submit tasks assigned to you' });
    }

    // Build the file URL from multer's saved file
    const fileUrl = req.file
      ? `http://localhost:5000/uploads/${req.file.filename}`
      : req.body.fileUrl || null;

    let submission = await Submission.findOne({ taskId, talentId: req.user._id });

    if (submission) {
      // Overwrite: update in place
      submission.fileUrl = fileUrl;
      submission.notes = notes;
      await submission.save();
    } else {
      submission = await Submission.create({
        taskId,
        talentId: req.user._id,
        fileUrl,
        notes,
      });
    }

    // Update task status to Submitted
    task.status = 'Submitted';
    await task.save();

    res.status(201).json(submission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Get submission for a specific task
// @route GET /api/submissions/:taskId
// @access Protect (Admin or Authorized Talent)
const getSubmission = async (req, res) => {
  try {
    const submission = await Submission.findOne({ taskId: req.params.taskId })
      .populate('talentId', 'name email');

    if (!submission) {
      return res.status(404).json({ message: 'No submission found for this task' });
    }

    // Only Admin or the owner (talentId) can view this submission
    if (req.user.role !== 'Admin' && submission.talentId._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied: You are not authorized to view this submission' });
    }

    res.json(submission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Get ALL submissions (for Admin review queue)
// @route GET /api/submissions/admin/all
// @access Admin
const getAllSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({})
      .populate('taskId', 'title dueDate status')
      .populate('talentId', 'name email')
      .sort({ createdAt: -1 });

    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Approve or Reject a submission
// @route PUT /api/submissions/:id/review
// @access Admin
const reviewSubmission = async (req, res) => {
  const { reviewStatus } = req.body;

  if (!['Approved', 'Rejected'].includes(reviewStatus)) {
    return res.status(400).json({ message: 'Invalid review status. Must be Approved or Rejected' });
  }

  try {
    const submission = await Submission.findByIdAndUpdate(
      req.params.id,
      { reviewStatus },
      { new: true }
    )
      .populate('taskId', 'title status')
      .populate('talentId', 'name email');

    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    // Update Task.status to 'Approved'/'Rejected'
    if (submission.taskId) {
      await Task.findByIdAndUpdate(submission.taskId._id, { status: reviewStatus });
    }

    res.json(submission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { submitTask, getSubmission, getAllSubmissions, reviewSubmission };
