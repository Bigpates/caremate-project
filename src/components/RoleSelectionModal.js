'use client'; 

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

// --- ICONS ---
const ParticipantIcon = ({ className }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const CoordinatorIcon = ({ className }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const ManagerIcon = ({ className }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;

const goalsByRole = {
  Participant: [
    { text: "Understand my plan", goal: "Understand my plan", prompt: "I'm a participant and I'd like some help understanding my NDIS plan." },
    { text: "Explore support options", goal: "Explore supports", prompt: "I'm a participant. Can you help me explore new support options I might be eligible for?" },
    { text: "Help me write a letter", goal: "Write a letter", prompt: "I'm a participant and I need help drafting a letter to my provider." },
  ],
  'Support Coordinator': [
    { text: "Draft a report", goal: "Draft a report", prompt: "As a Support Coordinator, I need to draft a progress report for a participant." },
    { text: "Brainstorm goals", goal: "Brainstorm goals", prompt: "As a Support Coordinator, help me brainstorm some potential goals for a client." },
    { text: "Save administrative time", goal: "Save time on admin", prompt: "As a Support Coordinator, what are some ways you can help me save time on admin?" },
  ],
  'Plan Manager': [
    { text: "Verify an invoice", goal: "Verify an invoice", prompt: "As a Plan Manager, I need to check an invoice against NDIS pricing arrangements." },
    { text: "Explain a budget", goal: "Explain a budget", prompt: "As a Plan Manager, help me draft a simple explanation of a budget for a participant." },
    { text: "Track spending patterns", goal: "Track spending", prompt: "As a Plan Manager, can you help me identify spending patterns in a budget?" },
  ],
};

const RoleCard = ({ title, description, onClick, icon }) => (
  <button onClick={onClick} className="group w-full bg-transparent p-6 rounded-lg border border-white/20 text-left transition-all duration-300 hover:bg-white/5 hover:border-white/40">
    <div className="flex items-start gap-4">
      <div className="text-secondary-text transition-colors duration-300 group-hover:text-primary-text">{icon}</div>
      <div>
        <h3 className="text-xl font-bold text-primary-text mb-2">{title}</h3>
        <p className="text-secondary-text text-sm font-light">{description}</p>
      </div>
    </div>
  </button>
);

const RoleSelectionModal = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [step, setStep] = useState('role');
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setStep('goal');
  };

  const handleGoalSelect = (goal) => {
    const roleQuery = encodeURIComponent(selectedRole);
    const goalQuery = encodeURIComponent(goal.goal);
    const promptQuery = encodeURIComponent(goal.prompt);
    router.push(`/chat?role=${roleQuery}&goal=${goalQuery}&prompt=${promptQuery}`);
  };

  const handleBack = () => {
    setStep('role');
    setSelectedRole(null);
  };
  
  const handleClose = () => {
    onClose();
    setTimeout(() => {
        setStep('role');
        setSelectedRole(null);
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 font-sans"
          onClick={handleClose}
        >
          <motion.div
            key={step} initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="bg-background rounded-2xl p-8 shadow-2xl border border-white/10 max-w-xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {step === 'role' && (
              <div>
                <h2 className="text-3xl font-light text-center mb-2 text-primary-text">How can I help you today?</h2>
                <p className="text-center text-secondary-text mb-8 font-light">Please select your role to start the conversation.</p>
                <div className="flex flex-col space-y-4">
                  <RoleCard title="Participant" description="Get help understanding your plan, tracking goals, and finding support." onClick={() => handleRoleSelect('Participant')} icon={<ParticipantIcon className="h-8 w-8" />} />
                  <RoleCard title="Support Coordinator" description="Generate documents, get strategic suggestions, and reduce admin." onClick={() => handleRoleSelect('Support Coordinator')} icon={<CoordinatorIcon className="h-8 w-8" />} />
                  <RoleCard title="Plan Manager" description="Verify invoices, track budgets, and provide clear financial reports." onClick={() => handleRoleSelect('Plan Manager')} icon={<ManagerIcon className="h-8 w-8" />} />
                </div>
              </div>
            )}
            {step === 'goal' && selectedRole && (
              <div>
                <button onClick={handleBack} className="text-sm text-secondary-text hover:text-primary-text mb-4">← Back to roles</button>
                <h2 className="text-3xl font-light text-center mb-8 text-primary-text">What is your primary goal today?</h2>
                <div className="flex flex-col space-y-4">
                  {goalsByRole[selectedRole].map((goal) => (
                    <button key={goal.text} onClick={() => handleGoalSelect(goal)} className="w-full text-left bg-[#1A1A1A] p-4 rounded-lg border border-white/10 hover:border-primary transition-colors">
                      {goal.text}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RoleSelectionModal;