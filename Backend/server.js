require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middlewares
app.use(helmet()); // Set security-related HTTP headers
app.use(cors()); // Enable CORS for all routes

// Body Parsing and Cookie Parsing
app.use(express.json()); // Parse incoming JSON requests
app.use(cookieParser()); // Parse cookies

// Rate Limiting Middleware
const apiLimiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000, // 15 minutes
  max: process.env.RATE_LIMIT_MAX || 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});
app.use(apiLimiter); // Apply rate limiting to all routes

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
 
})
  .then(() => console.log(`Connected to MongoDB URL: ${process.env.MONGODB_URI}`))
  .catch(err => console.error('MongoDB connection error:', err));

// Authentication Routes
app.use('/api/auth', authRoutes);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log error details for debugging
  res.status(500).json({ message: 'Internal Server Error' }); // Send generic error message
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
