const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

const app = express();

// Enable CORS (Cross-Origin Resource Sharing) to allow requests from different origins
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected")) // Successfully connected to MongoDB
  .catch(err => console.error("MongoDB error:", err)); // Log connection errors

// API routes
app.use('/api/auth', require('./routes/auth')); // Authentication routes (register, login)
app.use('/api/chat', require('./routes/chat')); // Chat routes (query LLM, manage conversations)

// Define the server port
const PORT = process.env.PORT || 8000;

// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
