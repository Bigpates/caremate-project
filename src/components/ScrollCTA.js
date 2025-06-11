import React from 'react';

const ScrollCTA = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 font-semibold text-primary-text border-2 border-primary-text rounded-full px-8 py-3 transition-all duration-300 ease-in-out hover:bg-primary-text hover:text-background hover:scale-105"
    >
      Discover Our Mission
    </button>
  );
};

export default ScrollCTA;