import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Sidebar({ userId, onSelectConversation }) {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:8000/api/conversations?userId=${userId}`)
        .then(res => setConversations(res.data))
        .catch(err => console.error('Failed to fetch conversations', err));
    }
  }, [userId]);

  return (
    <div className="sidebar">
      <h3>Your Conversations</h3>
      {conversations.map(conv => (
        <div
          key={conv._id}
          className="conversation-item"
          onClick={() => onSelectConversation(conv)}
        >
          {conv.title || 'Untitled'}
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
