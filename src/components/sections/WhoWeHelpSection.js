'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import DownArrow from '../DownArrow';

const testimonials = [
  { name: "Sarah P.", role: "Participant", portrait: "/portraits/participant.jpg", quote: "I finally feel in control of my NDIS journey. CareMate helped me understand my plan and advocate for myself in a way I never thought possible.", stat: { number: "100%", text: "Plan potential unlocked." } },
  { name: "David L.", role: "Support Coordinator", portrait: "/portraits/coordinator.jpg", quote: "The document generation feature is a game-changer. It saves me hours of administrative work each week, letting me focus on what truly matters.", stat: { number: "90%", text: "Time saved on admin." } },
  { name: "Maria G.", role: "Plan Manager", portrait: "/portraits/manager.jpg", quote: "Verifying invoices used to be a tedious, manual process. With CareMate's smart suggestions, I can ensure budget accuracy and provide clearer reports.", stat: { number: "99.9%", text: "Invoice accuracy." } }
];

const WhoWeHelpSection = ({ onStartJourneyClick, scrollTo }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    if (userInteracted) return;
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [userInteracted]);

  const goToNext = () => {
    setUserInteracted(true);
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const goToPrev = () => {
    setUserInteracted(true);
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    // The incorrect ref has been removed from this div
    <div id="who-we-help-section" className="relative min-h-screen flex flex-col items-center justify-center p-4">
      <div className="absolute bottom-0 left-0 text-[30vw] lg:text-[24rem] font-black text-white opacity-10 pointer-events-none">
        03
      </div>
      <div className="relative z-10 w-full flex flex-col items-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-12 text-primary-text text-center max-w-4xl mx-auto">Real People. Real Progress.</h2>
        <div className="relative w-full max-w-5xl h-[22rem] flex items-center justify-center">
          <button onClick={goToPrev} className="absolute left-0 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <div className="relative w-full max-w-xl h-full overflow-hidden">
            {testimonials.map((card, index) => {
              const offset = index - activeIndex;
              const isCenter = index === activeIndex;
              return (
                <motion.div
                  key={card.name}
                  className="absolute w-full h-full p-8 rounded-lg border border-white/20 backdrop-blur-sm bg-black/20 flex flex-col justify-center"
                  initial={{ x: `${offset * 100}%`, scale: isCenter ? 1 : 0.8, opacity: isCenter ? 1 : 0.5 }}
                  animate={{ x: `${offset * 100}%`, scale: isCenter ? 1 : 0.8, opacity: isCenter ? 1 : 0.5 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                  style={{ zIndex: testimonials.length - Math.abs(offset) }}
                  onHoverStart={() => setUserInteracted(true)}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden mr-4 flex-shrink-0">
                        <Image src={card.portrait} alt={`Portrait of ${card.name}`} width={64} height={64} className="object-cover blur-sm"/>
                    </div>
                    <div>
                      <p className="font-bold text-lg text-primary-text">{card.name}</p>
                      <p className="text-sm text-secondary-text">{card.role}</p>
                    </div>
                  </div>
                  <p className="text-lg italic text-primary-text flex-1">"{card.quote}"</p>
                  <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-4">
                    <p className="text-3xl font-bold text-primary">{card.stat.number}</p>
                    <p className="text-xs text-secondary-text">{card.stat.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <button onClick={goToNext} className="absolute right-0 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
      <DownArrow onClick={() => scrollTo('#how-it-works-section')} />
    </div>
  );
};

export default WhoWeHelpSection;