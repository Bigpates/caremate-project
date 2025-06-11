'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- ICONS ---
const CloseIcon = () => <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;
const AppearanceIcon = () => <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>;
const ChatParamsIcon = () => <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>;
const ProfileIcon = () => <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;


const SettingsModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('profile');

  // This check is important to allow the exit animation to complete
  if (!isOpen) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 font-sans"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="bg-background rounded-2xl shadow-2xl border border-white/10 w-full max-w-3xl flex" // Increased width
            style={{ height: '70vh' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* --- Settings Sidebar --- */}
            <div className="w-1/3 bg-[#111111] p-6 rounded-l-2xl border-r border-white/10 flex flex-col">
              <h2 className="text-xl font-bold text-primary-text mb-6">Settings</h2>
              <nav className="flex flex-col gap-2">
                <button onClick={() => setActiveTab('profile')} className={`flex items-center gap-3 p-2 rounded-lg text-left transition-colors w-full ${activeTab === 'profile' ? 'bg-primary text-background font-semibold' : 'text-secondary-text hover:bg-white/5'}`}>
                  <ProfileIcon/> <span>Profile</span>
                </button>
                <button onClick={() => setActiveTab('chat')} className={`flex items-center gap-3 p-2 rounded-lg text-left transition-colors w-full ${activeTab === 'chat' ? 'bg-primary text-background font-semibold' : 'text-secondary-text hover:bg-white/5'}`}>
                  <ChatParamsIcon/> <span>Chat Parameters</span>
                </button>
                <button onClick={() => setActiveTab('appearance')} className={`flex items-center gap-3 p-2 rounded-lg text-left transition-colors w-full ${activeTab === 'appearance' ? 'bg-primary text-background font-semibold' : 'text-secondary-text hover:bg-white/5'}`}>
                  <AppearanceIcon/> <span>Appearance</span>
                </button>
              </nav>
            </div>

            {/* --- Settings Content --- */}
            <div className="w-2/3 p-8 overflow-y-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === 'profile' && (
                    <div>
                      <h3 className="text-xl font-bold mb-4">Profile Personalisation</h3>
                      <div className="space-y-4 text-sm">
                        <div className="grid grid-cols-2 gap-4">
                          <input type="text" placeholder="First Name" className="bg-[#1A1A1A] border border-white/10 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-primary" />
                          <input type="text" placeholder="Last Name" className="bg-[#1A1A1A] border border-white/10 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-primary" />
                        </div>
                        <input type="text" placeholder="NDIS Number" className="bg-[#1A1A1A] border border-white/10 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-primary" />
                        <textarea placeholder="Describe your condition or situation..." className="bg-[#1A1A1A] border border-white/10 rounded-lg p-3 w-full h-24 resize-none focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
                        <input type="text" placeholder="Company Name (Optional)" className="bg-[#1A1A1A] border border-white/10 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-primary" />
                        <div>
                          <label className="text-sm text-secondary-text">Attach Documents (e.g., your NDIS plan)</label>
                          <input type="file" multiple className="mt-2 text-sm text-secondary-text file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-primary-text hover:file:bg-white/20 transition-colors cursor-pointer"/>
                        </div>
                      </div>
                    </div>
                  )}
                  {activeTab === 'chat' && (
                    <div>
                      <h3 className="text-xl font-bold mb-4">Chat Parameters</h3>
                       <div className="space-y-6 text-sm">
                         <div>
                           <label className="font-semibold text-primary-text">Language Output</label>
                           <p className="text-xs text-secondary-text mb-2">Choose the primary language for AI responses.</p>
                           <select className="mt-1 bg-[#1A1A1A] border border-white/10 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-primary"><option>English (Australia)</option></select>
                         </div>
                         <div>
                           <label className="font-semibold text-primary-text">AI Response Tone</label>
                           <p className="text-xs text-secondary-text mb-2">Select the tone that best suits your needs.</p>
                           <div className="flex gap-2 mt-2">
                             <button className="flex-1 p-2 rounded-lg bg-primary text-background font-semibold">Simple</button>
                             <button className="flex-1 p-2 rounded-lg bg-[#1A1A1A] text-secondary-text hover:border-primary border border-transparent transition-colors">Standard</button>
                             <button className="flex-1 p-2 rounded-lg bg-[#1A1A1A] text-secondary-text hover:border-primary border border-transparent transition-colors">Professional</button>
                           </div>
                         </div>
                       </div>
                    </div>
                  )}
                  {activeTab === 'appearance' && (
                    <div>
                      <h3 className="text-xl font-bold mb-4">Appearance</h3>
                      <div className="p-4 rounded-lg bg-black/20 flex justify-between items-center">
                        <p className="text-secondary-text">Light Mode</p>
                        <p className="text-xs text-secondary-text bg-white/10 px-2 py-1 rounded-full">Coming Soon</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SettingsModal;