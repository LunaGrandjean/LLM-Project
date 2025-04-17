import { useState } from 'react';
import axios from 'axios';

function Chat({ username }) {
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!question.trim()) return;

    const newUserMessage = { sender: 'user', text: question };
    setMessages([...messages, newUserMessage]);
    setQuestion('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:8000/api/chat/query', {
        username,
        question,
      });

      const aiMessage = { sender: 'ai', text: res.data.answer };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
      const errorMessage = {
        sender: 'ai',
        text: '⚠️ Something went wrong. Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Ask something about Griffith College</h2>

      <div className="chat-container">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {loading && <div className="message ai">💬 Thinking...</div>}
      </div>

      <div className="input-area">
        <input
          type="text"
          placeholder="Type your question here..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleEnter}
        />
        <button onClick={handleSend}>Ask</button>
      </div>
    </div>
  );
}

export default Chat;
