import React from 'react';
import DownArrow from '../DownArrow';

// Icons for the feature cards
const ChatIcon = () => <svg className="h-8 w-8 text-primary mb-4 transition-all duration-300 ease-in-out group-hover:drop-shadow-[0_0_5px_rgba(0,216,141,0.7)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>;
const DocIcon = () => <svg className="h-8 w-8 text-primary mb-4 transition-all duration-300 ease-in-out group-hover:drop-shadow-[0_0_5px_rgba(0,216,141,0.7)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const TargetIcon = () => <svg className="h-8 w-8 text-primary mb-4 transition-all duration-300 ease-in-out group-hover:drop-shadow-[0_0_5px_rgba(0,216,141,0.7)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" /></svg>;
const ShieldIcon = () => <svg className="h-8 w-8 text-primary mb-4 transition-all duration-300 ease-in-out group-hover:drop-shadow-[0_0_5px_rgba(0,216,141,0.7)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12 12 0 0012 21.697z" /></svg>;
const InvoiceIcon = () => <svg className="h-8 w-8 text-primary mb-4 transition-all duration-300 ease-in-out group-hover:drop-shadow-[0_0_5px_rgba(0,216,141,0.7)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 9a1 1 0 11-2 0 1 1 0 012 0zm0 6a1 1 0 11-2 0 1 1 0 012 0z" /></svg>;
const CompassIcon = () => <svg className="h-8 w-8 text-primary mb-4 transition-all duration-300 ease-in-out group-hover:drop-shadow-[0_0_5px_rgba(0,216,141,0.7)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;

const FeatureCard = ({ icon, title, children, className = '' }) => (
    <div className={`group bg-[#1A1A1A] p-6 rounded-lg border border-white/10 transition-all duration-300 hover:scale-[1.03] hover:border-primary/50 ${className}`}>
        {icon}
        <h3 className="text-xl font-bold mb-2 text-primary-text">{title}</h3>
        <p className="text-secondary-text text-sm leading-relaxed">{children}</p>
    </div>
);

const WhatWeDoSection = ({ scrollTo }) => {
  return (
    <div id="what-we-do-section" className="relative min-h-screen flex flex-col items-center justify-center p-4">
        <div className="absolute top-0 right-0 text-[30vw] lg:text-[24rem] font-black text-white opacity-10 pointer-events-none">
            02
        </div>
        <div className="relative z-10 max-w-6xl w-full text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-12 text-primary-text">A Smarter Way to NDIS</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FeatureCard className="md:col-span-2" icon={<ChatIcon />} title="Understand Your Plan">
                    Ask questions in plain language and get instant, smart guidance on what's possible with your funding. No more confusion.
                </FeatureCard>
                <FeatureCard icon={<TargetIcon />} title="Track Your Goals">
                    Receive personalized guidance and track your progress towards the future you want.
                </FeatureCard>
                <FeatureCard icon={<DocIcon />} title="Generate Documents">
                   Instantly create support letters, provider checklists, and goal-tracking documents.
                </FeatureCard>
                <FeatureCard className="md:col-span-2" icon={<CompassIcon />} title="Explore Possibilities">
                    Discover new services, supports, and strategies you may be eligible for to unlock the full potential of your plan.
                </FeatureCard>
                <FeatureCard icon={<InvoiceIcon />} title="Verify Invoicing">
                    Check provider invoices against your plan's line items to help prevent errors and funding misuse.
                </FeatureCard>
                <FeatureCard icon={<ShieldIcon />} title="Build Independence">
                    Get the tools and clarity you need to self-manage with confidence and advocate for yourself effectively.
                </FeatureCard>
            </div>
            <div className="mt-20 max-w-2xl mx-auto">
                <p className="text-lg text-secondary-text shine-effect">
                    "We believe the future of NDIS is participant-led. Our mission is to put the tools and clarity needed to take control directly into your hands."
                </p>
                <p className="mt-4 text-sm font-semibold text-primary-text">
                    — The Care Mate Team, with ❤️
                </p>
            </div>
        </div>
        <DownArrow onClick={() => scrollTo('#who-we-help-section')} />
    </div>
  );
};

export default WhatWeDoSection;