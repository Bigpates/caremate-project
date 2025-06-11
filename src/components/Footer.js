import React from 'react';
import Link from 'next/link';

// Social media icons from our Header component
const InstagramIcon = () => <svg className="h-6 w-6" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" /><path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M16.5 7.5l0 .01" /></svg>;
const TikTokIcon = () => <svg className="h-6 w-6" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M21 7.917v4.034a9.948 9.948 0 0 1 -5 -1.951v4.5a6.5 6.5 0 1 1 -8 -6.326v4.326a2.5 2.5 0 1 0 4 2v-11.5h4.083a6.005 6.005 0 0 0 4.917 4.917z" /></svg>;
const YouTubeIcon = () => <svg className="h-6 w-6" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M2 8a4 4 0 0 1 4 -4h12a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4 -4v-8z" /><path d="M10 9l5 3l-5 3z" /></svg>;


const Footer = () => {
  return (
    <footer className="bg-[#111111] text-secondary-text py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Column 1: Brand */}
        <div className="md:col-span-2">
            <Link href="/" className="text-2xl text-primary-text mb-4 inline-block">
              <span className="font-bold">Care</span><span className="font-light">Mate</span>.
            </Link>
            <p className="max-w-sm text-sm">
                Redefining what support can look like in the digital age, with humanity, empathy, and real power in the participant’s hands.
            </p>
            <div className="flex items-center space-x-5 mt-6">
              <a href="#" className="text-secondary-text hover:text-white"><InstagramIcon /></a>
              <a href="#" className="text-secondary-text hover:text-white"><TikTokIcon /></a>
              <a href="#" className="text-secondary-text hover:text-white"><YouTubeIcon /></a>
            </div>
        </div>

        {/* Column 2: Navigation */}
        <div>
            <h3 className="font-bold text-primary-text mb-4">Navigate</h3>
            <nav className="flex flex-col space-y-2 text-sm">
                <a href="#why-section" className="hover:text-primary-text transition-colors">About</a>
                <a href="#what-we-do-section" className="hover:text-primary-text transition-colors">Features</a>
                <a href="#who-we-help-section" className="hover:text-primary-text transition-colors">Testimonials</a>
                <a href="#how-it-works-section" className="hover:text-primary-text transition-colors">How It Works</a>
            </nav>
        </div>

        {/* Column 3: Legal */}
        <div>
            <h3 className="font-bold text-primary-text mb-4">Company</h3>
            <nav className="flex flex-col space-y-2 text-sm">
                <a href="#" className="hover:text-primary-text transition-colors">Contact Us</a>
                <a href="#" className="hover:text-primary-text transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-primary-text transition-colors">Terms of Service</a>
            </nav>
        </div>

      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10 text-center text-xs">
        <p>© 2025 Care Mate. All rights reserved. 
          Made with love ❤️</p>
      </div>
    </footer>
  );
};

export default Footer;