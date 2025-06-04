const express = require("express");
const router = express.Router();
const User = require("../models/User");

// ROUTE: POST /register
// Purpose: Handle user registration
router.post("/register", async (req, res) => {
  const { email, password } = req.body; // Extract email and password from request body
  try {
    // Check if a user already exists with the same email
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already in use" }); // Send error if email already exists
    }

    // Create a new user instance with email and password
    const user = new User({ email, password });
    // Save the new user to the database (password will be hashed by pre-save hook)
    await user.save();
    
    res.status(201).json({ message: "User registered successfully" }); // Send success response
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Registration failed" }); // Send server error response
  }
});

// ROUTE: POST /login
// Purpose: Handle user login/authentication
router.post("/login", async (req, res) => {
  const { email, password } = req.body; // Extract email and password from request body
  try {
    // Find the user by email
    const user = await User.findOne({ email });
    
    // Check if user exists and the password matches
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" }); // Authentication failed
    }

    // If credentials are correct, send success response (could extend to send a token for auth)
    res.json({ message: "Login successful", email: user.email });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed" }); // Send server error response
  }
});

module.exports = router;
