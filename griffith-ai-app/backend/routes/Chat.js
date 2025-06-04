const express = require("express");
const router = express.Router();
const axios = require("axios");
const Conversation = require("../models/conversation");

// ROUTE: POST /query
// Purpose: Handle querying the LLM and saving/continuing the conversation
router.post("/query", async (req, res) => {
  const { question, username, conversationId } = req.body;

  try {
    // Send question to the LLM service and get response
    const response = await axios.post("http://127.0.0.1:5000/query", { question });
    const answer = response.data.answer;
    const sources = response.data.sources || [];

    let conversation;

    if (conversationId) {
      // If a conversation ID is provided, find and append to existing conversation
      conversation = await Conversation.findById(conversationId);
      if (!conversation) {
        return res.status(404).json({ message: "Conversation not found" });
      }

      // Add new user message and AI response to conversation history
      conversation.messages.push(
        { sender: 'user', text: question },
        { sender: 'ai', text: answer }
      );
      await conversation.save();
    } else {
      // If no conversation ID, create a new conversation
      conversation = new Conversation({
        username,
        title: question.slice(0, 50), // First 50 characters of the question as the title
        messages: [
          { sender: 'user', text: question },
          { sender: 'ai', text: answer }
        ]
      });
      await conversation.save();
    }

    // Send back the answer and the conversation ID
    res.json({
      answer,
      conversationId: conversation._id,
      sources
    });

  } catch (err) {
    console.error("LLM query error:", err.message);
    res.status(500).json({ message: "LLM query failed" });
  }
});

// ROUTE: GET /conversations
// Purpose: Get all conversations of a specific user
router.get("/conversations", async (req, res) => {
  const { userId } = req.query;

  try {
    // Find conversations by username and sort by latest updated
    const conversations = await Conversation.find({ username: userId }).sort({ updatedAt: -1 });
    res.json(conversations);
  } catch (err) {
    console.error("Fetch conversations error:", err.message);
    res.status(500).json({ message: "Failed to fetch conversations" });
  }
});

// ROUTE: DELETE /conversations/:id
// Purpose: Delete a conversation by ID
router.delete("/conversations/:id", async (req, res) => {
  try {
    await Conversation.findByIdAndDelete(req.params.id);
    res.json({ message: "Conversation deleted" });
  } catch (err) {
    console.error("Delete conversation error:", err.message);
    res.status(500).json({ message: "Failed to delete conversation" });
  }
});

// ROUTE: PUT /conversations/:id
// Purpose: Rename an existing conversation
router.put("/conversations/:id", async (req, res) => {
  const { title } = req.body;
  try {
    const updated = await Conversation.findByIdAndUpdate(
      req.params.id,
      { title },
      { new: true } // Return the updated document
    );
    res.json(updated);
  } catch (err) {
    console.error("Rename conversation error:", err.message);
    res.status(500).json({ message: "Failed to rename conversation" });
  }
});

module.exports = router;
