const express = require("express");
const router = express.Router();
const axios = require("axios");
const Conversation = require("../models/conversation");

// Handle querying the LLM and saving/continuing the conversation
router.post("/query", async (req, res) => {
  const { question, username, conversationId } = req.body;

  try {
    // Get answer from LLM
    const response = await axios.post("http://127.0.0.1:5000/query", { question });
    const answer = response.data.answer;
    const sources = response.data.sources || [];

    let conversation;

    if (conversationId) {
      // 🧠 Append to existing conversation
      conversation = await Conversation.findById(conversationId);
      if (!conversation) {
        return res.status(404).json({ message: "Conversation not found" });
      }

      conversation.messages.push(
        { sender: 'user', text: question },
        { sender: 'ai', text: answer }
      );
      await conversation.save();
    } else {
      // 🆕 Create new conversation
      conversation = new Conversation({
        username,
        title: question.slice(0, 50),
        messages: [
          { sender: 'user', text: question },
          { sender: 'ai', text: answer }
        ]
      });
      await conversation.save();
    }

    res.json({
      answer,
      conversationId: conversation._id, // always return it
      sources
    });

  } catch (err) {
    console.error("❌ LLM error:", err.message);
    res.status(500).json({ message: "LLM query failed" });
  }
});

// Get all user conversations
router.get("/conversations", async (req, res) => {
  const { userId } = req.query;

  try {
    const conversations = await Conversation.find({ username: userId }).sort({ updatedAt: -1 });
    res.json(conversations);
  } catch (err) {
    console.error("❌ Fetch error:", err.message);
    res.status(500).json({ message: "Failed to fetch conversations" });
  }
});

// Delete a conversation
router.delete("/conversations/:id", async (req, res) => {
  try {
    await Conversation.findByIdAndDelete(req.params.id);
    res.json({ message: "Conversation deleted" });
  } catch (err) {
    console.error("❌ Delete error:", err.message);
    res.status(500).json({ message: "Failed to delete conversation" });
  }
});

// Rename a conversation
router.put("/conversations/:id", async (req, res) => {
  const { title } = req.body;
  try {
    const updated = await Conversation.findByIdAndUpdate(
      req.params.id,
      { title },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error("❌ Rename error:", err.message);
    res.status(500).json({ message: "Failed to rename conversation" });
  }
});

module.exports = router;
