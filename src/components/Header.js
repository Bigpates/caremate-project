'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

// ... (SVG Icons remain the same) ...

// Accept onLoginClick and onSignUpClick as props
const Header = ({ onLoginClick, onSignUpClick }) => { 
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => { setScrolled(window.scrollY > 10); };
    window.addEventListener('scroll', handleScroll);
    return () => { window.removeEventListener('scroll', handleScroll); };
  }, []);
  
  const handleNavClick = (target) => { /* ... (function remains the same) ... */ };
  const navLinks = [ /* ... (data remains the same) ... */ ];

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${ scrolled || isMenuOpen ? 'border-b border-white/10 bg-background/50 backdrop-blur-lg' : 'border-b border-transparent' }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-2xl text-primary-text">
              <span className="font-bold">Care</span><span className="font-light">Mate</span>.
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              {/* ... (Desktop Nav Links and Social Icons remain the same) ... */}

              {/* --- UPDATED: Auth Buttons --- */}
              <div className="flex items-center gap-4">
                  <button onClick={onLoginClick} className="text-sm font-medium text-secondary-text hover:text-primary-text transition-colors">Log In</button>
                  <button onClick={onSignUpClick} className="text-sm font-medium text-background bg-primary-text rounded-full px-4 py-2 hover:bg-primary hover:text-background transition-colors">Sign Up</button>
              </div>
            </nav>
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <CloseIcon /> : <MenuIcon />}</button>
            </div>
          </div>
        </div>
      </header>

      {/* --- UPDATED: Mobile Menu Auth Buttons --- */}
      <div className={`md:hidden fixed top-16 left-0 w-full h-[calc(100vh-4rem)] bg-background/95 backdrop-blur-lg z-40 transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <nav className="flex flex-col items-center justify-center h-full space-y-8">
            {/* ... (Mobile Nav Links and Social Icons remain the same) ... */}
             <div className="flex flex-col items-center gap-6 w-full px-8">
                  <button onClick={onLoginClick} className="text-2xl font-light text-secondary-text hover:text-primary-text transition-colors w-full text-center">Log In</button>
                  <button onClick={onSignUpClick} className="text-2xl font-light text-background bg-primary-text rounded-full w-full py-3 text-center hover:bg-primary hover:text-background transition-colors">Sign Up</button>
              </div>
        </nav>
      </div>
    </>
  );
};

// Re-add SVG icon components here to make the component self-contained
const InstagramIcon = () => <svg className="h-6 w-6" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" /><path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M16.5 7.5l0 .01" /></svg>;
const TikTokIcon = () => <svg className="h-6 w-6" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M21 7.917v4.034a9.948 9.948 0 0 1 -5 -1.951v4.5a6.5 6.5 0 1 1 -8 -6.326v4.326a2.5 2.5 0 1 0 4 2v-11.5h4.083a6.005 6.005 0 0 0 4.917 4.917z" /></svg>;
const YouTubeIcon = () => <svg className="h-6 w-6" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M2 8a4 4 0 0 1 4 -4h12a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4 -4v-8z" /><path d="M10 9l5 3l-5 3z" /></svg>;
const MenuIcon = () => <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>;
const CloseIcon = () => <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;

export default Header;