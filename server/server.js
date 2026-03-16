const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

dotenv.config();

const app = express();
const server = http.createServer(app);

// Setup Socket.IO
const io = new Server(server, {
    cors: {
        origin: "*", // Adjust in production
        methods: ["GET", "POST", "PUT"]
    }
});

io.on('connection', (socket) => {
    console.log(`Socket Connected: ${socket.id}`);

    socket.on('setup', (userId) => {
        socket.join(userId);
        console.log(`User ${userId} joined their personal room`);
    });

    socket.on('disconnect', () => {
        console.log('Socket disconnected');
    });
});

// Middleware
app.use(express.json());
app.use(cors());

// Make io accessible to our router
app.use((req, res, next) => {
    req.io = io;
    next();
});

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

const authRoutes = require('./routes/authRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const chatRoutes = require('./routes/chatRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const publicRoutes = require('./routes/publicRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/public', publicRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
