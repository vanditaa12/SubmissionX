const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const connectDB = require('./config/db');
const { verifyToken } = require('./middleware/authMiddleware'); // Import the middleware

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

// Use the verifyToken middleware for all admin routes
app.use('/api/admins', verifyToken, adminRoutes); // Protecting admin routes with token verification
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
