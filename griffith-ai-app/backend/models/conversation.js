const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  sender: String,
  text: String
});

const ConversationSchema = new mongoose.Schema({
  username: String,
  title: String,
  messages: [MessageSchema]
}, { timestamps: true });

module.exports = mongoose.model('Conversation', ConversationSchema);
