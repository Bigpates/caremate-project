import React from 'react';
import Link from 'next/link';

const ProSection = ({ onSignUpClick, onLoginClick }) => {
  return (
    <div id="pro-section" className="relative text-center p-4 py-24">
      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold text-primary-text">
          Unlock the Full Power of{' '}
            <span className="font-bold">Care</span><span className="font-light">Mate</span>.
        </h2>
        <p className="mt-4 text-lg text-secondary-text max-w-2xl mx-auto">
          Create a free account to access Pro features. Save your conversation history, securely store documents, and receive even more personalized insights over time.
        </p>
        <div className="flex justify-center items-center gap-4 mt-12">
            <button onClick={onLoginClick} className="font-semibold text-primary-text border-2 border-primary-text rounded-full px-8 py-3 transition-all duration-300 ease-in-out hover:bg-primary-text hover:text-background hover:scale-105">
                Log In
            </button>
            <button 
              onClick={onSignUpClick}
              className="bg-primary text-background font-bold text-lg py-4 px-8 rounded-full hover:shadow-lg hover:shadow-primary/20 hover:brightness-110 transition-all duration-300"
            >
                Sign Up for Free
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProSection;