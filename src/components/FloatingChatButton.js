import React from 'react';

const SparkleIcon = () => (
    <svg className="h-8 w-8" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" stroke="currentColor" strokeLinejoin="round"/>
        <path d="M5 2L6 5L9 6L6 7L5 10L4 7L1 6L4 5L5 2Z" stroke="currentColor" strokeLinejoin="round"/>
        <path d="M19 2L20 5L23 6L20 7L19 10L18 7L15 6L18 5L19 2Z" stroke="currentColor" strokeLinejoin="round"/>
    </svg>
);


const FloatingChatButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      // NEW, SIMPLIFIED STYLES: Starts white with a black icon, inverts on hover.
      className="fixed bottom-8 right-8 z-40 flex items-center justify-center w-16 h-16 bg-primary-text text-background rounded-full shadow-lg transition-all duration-300 ease-in-out hover:bg-background hover:text-primary-text hover:scale-110"
      aria-label="Start Conversation"
    >
        <SparkleIcon />
    </button>
  );
};

export default FloatingChatButton;