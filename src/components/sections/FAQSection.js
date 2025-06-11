'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ChevronIcon = ({ isOpen }) => <motion.svg animate={{ rotate: isOpen ? 180 : 0 }} className="h-6 w-6 text-secondary-text flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></motion.svg>;

const faqData = [
    { question: "Is this app officially NDIS approved?", answer: "Care Mate is an independent tool designed to help you navigate the NDIS. It is not an official NDIS product, nor is it endorsed by the NDIA. We provide guidance based on publicly available information and the NDIS Price Guide." },
    { question: "How accurate is the information?", answer: "Our AI uses advanced models like GPT-4 and is trained on current NDIS guidelines. However, AI can make mistakes. We strongly recommend using our answers as a powerful guide and always verifying critical information with your official support network or the NDIA." },
    { question: "Can I get help at night?", answer: "Yes. Care Mate is available 24/7. Whether it's a late-night question or an early-morning planning session, our AI assistant is always ready to help." },
    { question: "Do I need to log in?", answer: "No login is required to use the free assistant. We believe in providing immediate help without barriers. An account is only needed for optional 'Pro' features like saving your chat history or advanced document storage." },
    { question: "Is my data safe?", answer: "Absolutely. We do not store personally identifiable information from your conversations. All data is securely hosted on Australian servers, ensuring data sovereignty and compliance with local privacy laws." }
];

const AccordionItem = ({ item, onToggle, isOpen }) => (
    <div className="border-b border-white/10 last:border-b-0">
        <button onClick={onToggle} className="flex justify-between items-center w-full p-6 text-left hover:bg-white/5 transition-colors duration-300">
            <span className="text-lg font-semibold text-primary-text">{item.question}</span>
            <ChevronIcon isOpen={isOpen} />
        </button>
        <AnimatePresence>
            {isOpen && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }} className="overflow-hidden">
                    <p className="p-6 pt-0 text-left text-secondary-text leading-relaxed">{item.answer}</p>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

const FAQSection = ({ onStartJourneyClick }) => {
    const [expandedIndex, setExpandedIndex] = useState(0);

    return (
        <div id="faq-section" className="relative min-h-screen flex flex-col items-center justify-center p-4">
             <div className="absolute top-0 right-0 text-[30vw] lg:text-[24rem] font-black text-white opacity-10 pointer-events-none">
                06
            </div>
            <div className="relative z-10 max-w-4xl w-full text-center">
                <h2 className="text-4xl md:text-6xl font-bold mb-16 text-primary-text">
                    Frequently Asked Questions
                </h2>
                <div className="w-full border border-white/10 rounded-lg bg-black/20 backdrop-blur-sm">
                    {faqData.map((item, index) => (
                        <AccordionItem 
                            key={index} 
                            item={item}
                            isOpen={index === expandedIndex}
                            onToggle={() => setExpandedIndex(index === expandedIndex ? -1 : index)}
                        />
                    ))}
                </div>
                {/* The final CTA has been moved to the ProSection */}
            </div>
        </div>
    );
};

export default FAQSection;