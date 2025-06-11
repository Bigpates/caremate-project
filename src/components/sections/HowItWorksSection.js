'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DownArrow from '../DownArrow'; // Make sure DownArrow is imported

// Icons...
const AskIcon = () => <svg className="h-10 w-10 mb-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const GenerateIcon = () => <svg className="h-10 w-10 mb-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const ShieldIcon = () => <svg className="h-10 w-10 mb-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12 12 0 0012 21.697z" /></svg>;
const ChevronIcon = ({ isOpen }) => <motion.svg animate={{ rotate: isOpen ? 180 : 0 }} className="h-6 w-6 text-secondary-text" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></motion.svg>

const steps = [
    { icon: <AskIcon />, title: "1. Ask Anything", content: "Start a conversation just like you would with a person. Ask about your funding, what services you can access, or for help with a specific problem to get clear, human-style answers." },
    { icon: <GenerateIcon />, title: "2. Get Personalized Guidance", content: "CareMate doesn't just give generic answers. It understands the context of your conversation and your role to provide guidance that is relevant to your specific situation." },
    { icon: <ShieldIcon />, title: "3. Generate Instant Documents", content: "Generate fully compliant support letters, checklists, and reports with a single request, saving you hours of work." }
];

const AccordionItem = ({ item, onToggle, isOpen }) => (
    <div className="border-b border-white/10 last:border-b-0">
        <button onClick={onToggle} className="flex justify-between items-center w-full p-6 text-left hover:bg-white/5 transition-colors duration-300">
            <div className="flex items-center gap-4">
                {item.icon}
                <span className="text-xl font-bold text-primary-text">{item.title}</span>
            </div>
            <ChevronIcon isOpen={isOpen} />
        </button>
        <AnimatePresence>
            {isOpen && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }} className="overflow-hidden">
                    <p className="p-6 pt-0 text-left text-secondary-text">{item.content}</p>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

const HowItWorksSection = ({ scrollTo }) => {
    const [expandedIndex, setExpandedIndex] = useState(0);

    return (
        <div id="how-it-works-section" className="relative min-h-screen flex flex-col items-center justify-center p-4">
            <div className="absolute top-0 right-0 text-[30vw] lg:text-[24rem] font-black text-white opacity-10 pointer-events-none">
                04
            </div>
            <div className="relative z-10 max-w-4xl w-full text-center">
                <h2 className="text-4xl md:text-6xl font-bold mb-16 text-primary-text">
                    How <span className="font-bold">Care</span><span className="font-light">Mate</span>. Works
                </h2>
                <div className="w-full border border-white/10 rounded-lg bg-black/20 backdrop-blur-sm">
                    {steps.map((step, index) => (
                        <AccordionItem key={index} item={step} isOpen={index === expandedIndex} onToggle={() => setExpandedIndex(index === expandedIndex ? -1 : index)} />
                    ))}
                </div>
            </div>
            {/* Added DownArrow to navigate to the Security section */}
            <DownArrow onClick={() => scrollTo('#security-section')} />
        </div>
    );
};

export default HowItWorksSection;