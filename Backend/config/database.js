const mongoose = require('mongoose');

const connect = () => {
    const MONGO_URI = process.env.MONGODB_URL || 'your-default-mongodb-uri';
    mongoose
        .connect(MONGO_URI)
        .then(() => console.log('Connected to MongoDB'))
        .catch((err) => console.error('Error connecting to MongoDB:', err));
};

module.exports = { connect };
