'use client';
import React, { useEffect, useState } from 'react';

const ChatHistory = ({ onSelect }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('chatHistory');
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (err) {
      console.error('Failed to load chat history', err);
    }
  }, []);

  const handleDelete = (id) => {
    const updated = history.filter((h) => h.id !== id);
    setHistory(updated);
    localStorage.setItem('chatHistory', JSON.stringify(updated));
  };

  return (
    <nav className="flex flex-col mb-6 space-y-1">
      {history.map((chat) => (
        <div key={chat.id} className="flex items-center">
          <a
            href="#"
            onClick={() => onSelect && onSelect(chat)}
            className="flex-1 p-2 text-sm truncate rounded-lg text-secondary-text hover:bg-white/5 hover:text-primary-text transition-colors"
          >
            {chat.title}
          </a>
          <button
            aria-label="delete"
            onClick={() => handleDelete(chat.id)}
            className="text-secondary-text hover:text-red-500 p-1"
          >
            &times;
          </button>
        </div>
      ))}
    </nav>
  );
};

export default ChatHistory;
