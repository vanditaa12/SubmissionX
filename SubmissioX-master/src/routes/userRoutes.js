const express = require('express');
const router = express.Router();
const { validateUserInput } = require('../utils/validateInput');
const User = require('../models/User');

// POST /register
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Validate user input
    const validationResult = validateUserInput({ username, email, password });
    if (!validationResult.valid) {
        return res.status(400).json({ message: validationResult.message });
    }

    // If validation passed, proceed with user registration logic
    // ...

    res.status(201).json({ message: 'User registered successfully' });
});

// POST /login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Validate user input
    const validationResult = validateUserInput({ email, password });
    if (!validationResult.valid) {
        return res.status(400).json({ message: validationResult.message });
    }

    // If validation passed, proceed with login logic
    // ...

    res.status(200).json({ message: 'Login successful' });
});

module.exports = router;
