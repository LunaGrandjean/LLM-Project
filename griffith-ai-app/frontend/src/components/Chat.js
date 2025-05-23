import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

function Chat({ username }) {
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);

  useEffect(() => {
    const fetchConversations = async () => {
      const res = await axios.get('http://localhost:8000/api/chat/conversations', {
        params: { userId: username },
      });
      setConversations(res.data);
    };
    fetchConversations();
  }, [username]);

  const handleSend = async () => {
    if (!question.trim()) return;

    const userMsg = { sender: 'user', text: question };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setQuestion('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:8000/api/chat/query', {
        username,
        question,
        conversationId: activeConversationId,
      });

      const aiMsg = { sender: 'ai', text: res.data.answer };
      const newMessages = [...updatedMessages, aiMsg];
      setMessages(newMessages);

      if (!activeConversationId && res.data.conversationId) {
        // This was a new chat
        setActiveConversationId(res.data.conversationId);
        setConversations((prev) => [
          {
            _id: res.data.conversationId,
            title: question.slice(0, 50),
            messages: newMessages,
          },
          ...prev,
        ]);
      } else {
        // Updating existing conversation
        setConversations((prev) =>
          prev.map((conv) =>
            conv._id === res.data.conversationId
              ? { ...conv, messages: newMessages }
              : conv
          )
        );
      }
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
    if (!conv || !conv.messages) return;
    setMessages(conv.messages);
    setActiveConversationId(conv._id);
  };

  const handleNewConversation = () => {
    setMessages([]);
    setActiveConversationId(null);
  };

  const handleDeleteConversation = async (id) => {
    await axios.delete(`http://localhost:8000/api/chat/conversations/${id}`);
    setConversations((prev) => prev.filter((c) => c._id !== id));
    if (activeConversationId === id) {
      handleNewConversation();
    }
  };

  const handleRenameConversation = async (id, newTitle) => {
    const res = await axios.put(`http://localhost:8000/api/chat/conversations/${id}`, { title: newTitle });
    setConversations((prev) =>
      prev.map((c) => (c._id === id ? { ...c, title: res.data.title } : c))
    );
  };

  return (
    <div className="main-layout">
      <Sidebar
        userId={username}
        conversations={conversations}
        onSelectConversation={handleSelectConversation}
        onNewConversation={handleNewConversation}
        onDeleteConversation={handleDeleteConversation}
        onRenameConversation={handleRenameConversation}
      />

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
