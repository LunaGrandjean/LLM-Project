const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
  username: String,
  question: String,
  answer: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Conversation', ConversationSchema);
