const express = require('express');
const router = express.Router();
const axios = require('axios');
const Conversation = require('../models/Conversation');

router.post('/query', async (req, res) => {
  const { username, question } = req.body;

  try {
    const response = await axios.post('http://127.0.0.1:5000/query', { question });
    const answer = response.data.answer;

    const convo = new Conversation({ username, question, answer });
    await convo.save();

    res.json({ answer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "LLM service error" });
  }
});

module.exports = router;
