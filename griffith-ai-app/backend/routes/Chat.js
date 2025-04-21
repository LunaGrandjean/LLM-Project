const express = require("express");
const router = express.Router();
const axios = require("axios");
const Conversation = require("../models/conversation");

// Handle querying the LLM and saving the conversation
router.post("/query", async (req, res) => {
  const { question, username } = req.body;

  try {
    const response = await axios.post("http://127.0.0.1:5000/query", { question });
    const answer = response.data.answer;

    // Save conversation
    const conversation = new Conversation({
      username,
      title: question.slice(0, 50),
      messages: [
        { sender: 'user', text: question },
        { sender: 'ai', text: answer }
      ]
    });
    await conversation.save();

    res.json({ answer });
  } catch (err) {
    console.error("Error communicating with LLM:", err.message);
    res.status(500).json({ message: "LLM query failed" });
  }
});

// Fetch all conversations for a user
router.get("/conversations", async (req, res) => {
  const { userId } = req.query;
  try {
    const conversations = await Conversation.find({ username: userId }).sort({ createdAt: -1 });
    res.json(conversations);
  } catch (err) {
    console.error("Error fetching conversations:", err.message);
    res.status(500).json({ message: "Failed to fetch conversations" });
  }
});

module.exports = router;
