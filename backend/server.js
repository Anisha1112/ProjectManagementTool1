const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const taskRoutes = require('./routes/tasks');
const commentRoutes = require('./routes/comments');

const app = express();
const server = http.createServer(app);

// Socket.IO setup
const io = new Server(server, {
  cors: { origin: '*' }
});

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/project_tool')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/comments', commentRoutes);

// Socket.IO real-time comments
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Listen for new comment from frontend
  socket.on('comment', ({ projectId, taskId, comment, user }) => {
    // Optional: save comment in MongoDB if you have a Comment model
    // Comment.create({ project: projectId, task: taskId, user, text: comment });

    // Broadcast comment to all connected clients
    io.emit('comment', { projectId, taskId, comment, user });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start server
server.listen(5000, () => console.log('Server running on port 5000'));
