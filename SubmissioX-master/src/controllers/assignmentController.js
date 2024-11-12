const Assignment = require('../models/Assignment');

// View assignments tagged to the admin
const viewAssignments = async (req, res) => {
    try {
        // Assuming admin's name is stored in req.user.name
        const assignments = await Assignment.find({ admin: req.user.name });
        res.json(assignments);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get a specific assignment by ID
const getAssignmentById = async (req, res) => {
    const { id } = req.params;
    try {
        const assignment = await Assignment.findById(id); // Find the assignment by ID
        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }
        res.json(assignment); // Return the found assignment
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Accept an assignment by ID
const acceptAssignment = async (req, res) => {
    try {
        const assignment = await Assignment.findByIdAndUpdate(
            req.params.id,
            { status: 'Accepted' },
            { new: true }
        );
        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }
        res.json({ message: 'Assignment accepted', assignment });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Reject an assignment by ID
const rejectAssignment = async (req, res) => {
    try {
        const assignment = await Assignment.findByIdAndUpdate(
            req.params.id,
            { status: 'Rejected' },
            { new: true }
        );
        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }
        res.json({ message: 'Assignment rejected', assignment });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Upload a new assignment
const uploadAssignment = async (req, res) => {
    const { title, description } = req.body; // Assuming title and description are sent in the body
    try {
        const newAssignment = new Assignment({
            title,
            description,
            status: 'Pending', // Default status
            admin: req.user.name // Set admin who is uploading
        });
        await newAssignment.save(); // Save the new assignment to the database
        res.status(201).json(newAssignment); // Return the newly created assignment
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = {
    viewAssignments,
    getAssignmentById, // Added the new function
    acceptAssignment,
    rejectAssignment,
    uploadAssignment // Added the new function
};
