const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection failed:', err));

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const protectedRoutes = require('./routes/protected');
app.use('/api/user', protectedRoutes);

// Event Manager Routes
const eventManagerRoutes = require('./routes/eventManager');
app.use('/api/event-manager', eventManagerRoutes);

// Event Works Routes (for posting works by event managers)
const eventWorksRoutes = require('./routes/eventWorks');
app.use('/api/eventworks', eventWorksRoutes);

// Hire / fetch event managers route
const hireRoutes = require('./routes/hireRoutes'); // ✅ new
app.use('/api/event-manager', hireRoutes); // same endpoint as frontend expects

// Test route
app.get('/', (req, res) => {
  res.send('🚀 Backend is working!');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
