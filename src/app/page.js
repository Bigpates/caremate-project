'use client';

import { useState, useEffect, useRef } from 'react';
import FloatingChatButton from '@/components/FloatingChatButton';
import RoleSelectionModal from '@/components/RoleSelectionModal';
import AuthModal from '@/components/AuthModal';
import HeroSection from '@/components/sections/HeroSection';
import WhySection from '@/components/sections/WhySection';
import WhatWeDoSection from '@/components/sections/WhatWeDoSection';
import WhoWeHelpSection from '@/components/sections/WhoWeHelpSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import SecuritySection from '@/components/sections/SecuritySection';
import FAQSection from '@/components/sections/FAQSection';
import ProSection from '@/components/sections/ProSection';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Home() {
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const mainRef = useRef(null);

  const scrollToSection = (target) => {
    gsap.to(window, {
      duration: 1.5,
      scrollTo: target,
      ease: 'power2.inOut',
    });
  };
  
  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);
  const openRoleModal = () => setIsRoleModalOpen(true);
  const closeRoleModal = () => setIsRoleModalOpen(false);

  useEffect(() => {
    const sections = gsap.utils.toArray('.section-panel');
    sections.forEach((section) => {
      gsap.fromTo(section, 
        { autoAlpha: 0, y: 50 },
        { 
          autoAlpha: 1, y: 0, duration: 1, 
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    });
  }, []);

  return (
    <div>
      <ParticleBackground />
      <main ref={mainRef}>
        <div className="section-panel"><HeroSection onDiscoverClick={() => scrollToSection('#why-section')} onAuthClick={openAuthModal} /></div>
        <div className="section-panel"><WhySection scrollTo={scrollToSection} /></div>
        <div className="section-panel"><WhatWeDoSection scrollTo={scrollToSection} /></div>
        <div className="section-panel"><WhoWeHelpSection scrollTo={scrollToSection} /></div>
        <div className="section-panel"><HowItWorksSection scrollTo={scrollToSection} /></div>
        <div className="section-panel"><SecuritySection scrollTo={scrollToSection} /></div>
        <div className="section-panel"><FAQSection scrollTo={scrollToSection} /></div>
        <div className="section-panel"><ProSection onSignUpClick={openAuthModal} /></div>
      </main>

      <Footer />

      <FloatingChatButton onClick={openRoleModal} />
      <RoleSelectionModal 
        isOpen={isRoleModalOpen} 
        onClose={closeRoleModal} 
      />
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={closeAuthModal} 
      />
    </div>
  );
}