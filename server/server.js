const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    }
};

connectDB();

// Routes
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Import Routes
// Import Routes
const authRoutes = require('./routes/authRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const chatRoutes = require('./routes/chatRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/chat', chatRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
