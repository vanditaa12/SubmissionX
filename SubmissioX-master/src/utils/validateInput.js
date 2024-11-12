// utils/validateInput.js

// Check if a field is empty
const isEmpty = (value) => {
    return !value || value.trim().length === 0;
};

// Check if email is valid
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Check if password meets the criteria (min length of 6 chars)
const isValidPassword = (password) => {
    return password && password.length >= 6;
};

// General validation function for registration or login inputs
const validateUserInput = (input) => {
    const { username, email, password } = input;

    if (isEmpty(username)) {
        return { valid: false, message: 'Username cannot be empty' };
    }

    if (isEmpty(email) || !isValidEmail(email)) {
        return { valid: false, message: 'Invalid or empty email' };
    }

    if (isEmpty(password) || !isValidPassword(password)) {
        return { valid: false, message: 'Password must be at least 6 characters' };
    }

    return { valid: true, message: 'Validation passed' };
};

// Function to validate assignment input
const validateAssignmentInput = (input) => {
    const { task, userId, admin } = input;

    if (isEmpty(userId)) {
        return { valid: false, message: 'User ID cannot be empty' };
    }

    if (isEmpty(task)) {
        return { valid: false, message: 'Task description cannot be empty' };
    }

    if (isEmpty(admin)) {
        return { valid: false, message: 'Admin ID cannot be empty' };
    }

    return { valid: true, message: 'Validation passed' };
};

module.exports = {
    validateUserInput,
    validateAssignmentInput
};
