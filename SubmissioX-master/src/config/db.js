const mongoose = require('mongoose');

const connectDB = async () => {
    const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/submissiox';

    try {
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected...');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
