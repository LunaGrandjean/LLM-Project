import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

function Chat({ username }) {
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!question.trim()) return;
    const userMsg = { sender: 'user', text: question };
    setMessages((prev) => [...prev, userMsg]);
    setQuestion('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:8000/api/chat/query', {
        username,
        question,
      });

      const aiMsg = { sender: 'ai', text: res.data.answer };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: '⚠️ Something went wrong. Please try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  const handleSelectConversation = (conv) => {
    setMessages(conv.messages);
  };

  return (
    <div className="main-layout">
      <Sidebar userId={username} onSelectConversation={handleSelectConversation} />

      <main className="chat-main">
        <h2>Ask something about Griffith College</h2>
        <div className="input-area">
          <input
            type="text"
            placeholder="Type your question here..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleEnter}
          />
          <button onClick={handleSend}>➤</button>
        </div>

        <div className="chat-container">
          {messages.map((msg, i) => (
            <div key={i} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
          {loading && <div className="message ai">💬 Thinking...</div>}
        </div>
      </main>
    </div>
  );
}

export default Chat;
