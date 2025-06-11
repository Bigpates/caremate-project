'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AuthModal = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState('login'); // 'login' or 'signup'

  if (!isOpen) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 font-sans"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="bg-background rounded-2xl p-8 shadow-2xl border border-white/10 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {mode === 'login' ? (
              <div>
                <h2 className="text-3xl font-bold text-center mb-6 text-primary-text">Welcome Back</h2>
                <form className="flex flex-col gap-4">
                  <input type="email" placeholder="Email" className="bg-[#1A1A1A] border border-white/10 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary" />
                  <input type="password" placeholder="Password" className="bg-[#1A1A1A] border border-white/10 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary" />
                  <button type="submit" className="bg-primary text-background font-bold py-3 rounded-lg hover:brightness-110 transition mt-4">Log In</button>
                </form>
                <p className="text-center text-sm text-secondary-text mt-6">
                  Don't have an account?{' '}
                  <button onClick={() => setMode('signup')} className="font-bold text-primary-text hover:underline">
                    Sign Up
                  </button>
                </p>
              </div>
            ) : (
              <div>
                <h2 className="text-3xl font-bold text-center mb-6 text-primary-text">Create Account</h2>
                <form className="flex flex-col gap-4">
                  <input type="email" placeholder="Email" className="bg-[#1A1A1A] border border-white/10 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary" />
                  <input type="password" placeholder="Password" className="bg-[#1A1A1A] border border-white/10 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary" />
                  <button type="submit" className="bg-primary text-background font-bold py-3 rounded-lg hover:brightness-110 transition mt-4">Sign Up for Free</button>
                </form>
                <p className="text-center text-sm text-secondary-text mt-6">
                  Already have an account?{' '}
                  <button onClick={() => setMode('login')} className="font-bold text-primary-text hover:underline">
                    Log In
                  </button>
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;