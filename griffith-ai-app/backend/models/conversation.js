const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  sender: {
    type: String,
    enum: ['user', 'ai'],
    required: true
  },
  text: {
    type: String,
    required: true,
    trim: true
  }
});

const ConversationSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  messages: {
    type: [MessageSchema],
    default: []
  }
}, { timestamps: true });

module.exports = mongoose.model('Conversation', ConversationSchema);
