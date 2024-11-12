const express = require('express');
const {
    viewAssignments,
    acceptAssignment,
    rejectAssignment
} = require('../controllers/assignmentController');
const { verifyToken } = require('../middleware/authMiddleware'); // Import the token verification middleware
const { isAdmin } = require('../middleware/roleMiddleware'); // Import the admin check middleware

const router = express.Router();

// Middleware to ensure the user is authenticated and an admin
router.use(verifyToken); // Check for token first
router.use(isAdmin); // Then check if user is admin

// View assignments tagged to the admin
router.get('/assignments', viewAssignments);

// Accept an assignment by ID
router.post('/assignments/:id/accept', acceptAssignment);

// Reject an assignment by ID
router.post('/assignments/:id/reject', rejectAssignment);

module.exports = router;
