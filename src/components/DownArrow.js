import React from 'react';

const DownArrow = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-secondary-text rounded-full p-2 transition-all duration-300 ease-in-out hover:text-primary-text hover:scale-110"
      aria-label="Scroll to next section"
    >
      <svg
        className="w-8 h-8 animate-bounce"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        ></path>
      </svg>
    </button>
  );
};

export default DownArrow;