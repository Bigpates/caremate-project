import React from 'react';
import ParticleBackground from '../ParticleBackground';
import Image from 'next/image';
import ScrollCTA from '../ScrollCTA';

const HeroSection = ({ onDiscoverClick }) => {
  return (
    <div id="hero-section" className="relative min-h-screen flex flex-col items-center justify-center text-center p-4">
      <ParticleBackground />

      <h1 className="text-5xl md:text-7xl mb-4 z-10 text-primary-text">
        <span className="font-bold">Care</span><span className="font-light">Mate</span>.
      </h1>
      
      <p className="text-xl md:text-2xl text-secondary-text max-w-3xl z-10 mb-8">
        Navigate NDIS with Confidence, Care, and Clarity. Your 24/7 AI companion for a simpler journey.
      </p>

      <div className="flex items-baseline space-x-2 z-10">
        <span className="text-sm">Powered for</span>
        <span className="font-bold text-lg text-primary-text tracking-wider">NDIS</span>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-4 mt-8 z-10">
        <a href="#" className="transition-transform duration-300 hover:scale-105">
          <Image
            src="/images/appstore.svg"
            alt="Download on the App Store"
            width={125}
            height={42}
            priority
          />
        </a>
        <a href="#" className="transition-transform duration-300 hover:scale-105">
          <Image
            src="/images/googleplay.png"
            alt="Get it on Google Play"
            width={140}
            height={42}
            priority
          />
        </a>
      </div>
      <ScrollCTA onClick={onDiscoverClick} />
    </div>
  );
};

export default HeroSection;