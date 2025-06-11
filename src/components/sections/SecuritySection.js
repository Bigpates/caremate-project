import React from 'react';
import DownArrow from '../DownArrow'; // Import the DownArrow component

// Icons for the security features
const DataIcon = () => <svg className="h-8 w-8 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /><path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /></svg>;
const PrivacyIcon = () => <svg className="h-8 w-8 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.517-1.009 6.789-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0012 11c1.23-1.897 1.354-4.243.8-6.118A4.5 4.5 0 0012 2.5a4.5 4.5 0 00-4.096 2.382c-.554 1.875-.43 4.22.8 6.118z" /></svg>;
const FilterIcon = () => <svg className="h-8 w-8 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>;
const HandshakeIcon = () => <svg className="h-8 w-8 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M15.42,14.62L12,11.21l1.41-1.41l3.42,3.41L15.42,14.62z"/><path d="M6,14.5l1.5-1.5l-1.42-1.41L4.58,13.08L6,14.5z"/><path d="M10.21,11.21L9.5,10.5l-1.41,1.41l0.71,0.71L10.21,11.21z"/><path d="M11,22c-2.42,0-4.68-0.92-6.36-2.64L2,16.71V22h9V22z"/><path d="M22,11c0-2.42-0.92-4.68-2.64-6.36L16.71,2H22V11z"/><path d="M13,2h-2v2.59l2,2V2z"/><path d="M2,11V9H4.59l2,2H2z"/><path d="M2,13v-2H0v2H2z"/><path d="M9,2H7v2.59l2,2V2z"/><path d="M11,2H9v2h2V2z"/><path d="M13,22h-2v-2.59l2-2V22z"/><path d="M22,13v-2h2v2H22z"/><path d="M22,9V7h-2.59l-2,2H22z"/><path d="M17,22h2v-2.59l-2-2V22z"/><path d="M4.93,3.51L3.51,4.93L6.59,8H2V2h4.59L3.51,4.93z"/><path d="M19.07,20.49l1.41-1.41L17.41,16H22v4.59L19.07,20.49z"/></svg>;


const FeatureListItem = ({ icon, title, children }) => (
    <div className="flex items-start gap-4">
        <div className="flex-shrink-0 mt-1">{icon}</div>
        <div>
            <h3 className="text-xl font-bold text-primary-text">{title}</h3>
            <p className="mt-1 text-secondary-text">{children}</p>
        </div>
    </div>
);

// Accept scrollTo prop and remove onStartJourneyClick
const SecuritySection = ({ scrollTo }) => {
  return (
    <div id="security-section" className="relative min-h-screen flex flex-col items-center justify-center p-4">
        <div className="absolute bottom-0 left-0 text-[30vw] lg:text-[24rem] font-black text-white opacity-10 pointer-events-none">
            05
        </div>
        <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div className="text-left relative z-10">
                <h2 className="text-4xl md:text-6xl font-bold text-primary-text">Built for NDIS Standards.</h2>
                <p className="mt-4 text-lg text-secondary-text">We take privacy and compliance seriously. Our platform is built from the ground up with a focus on security and adherence to the NDIS Code of Conduct.</p>
            </div>
            <div className="relative z-10 flex flex-col gap-8 bg-[#1A1A1A] p-8 rounded-lg border border-white/10">
                <FeatureListItem icon={<DataIcon />} title="Data Stays in Australia">
                    All your data is securely hosted on Australian servers, ensuring data sovereignty and compliance with local privacy laws.
                </FeatureListItem>
                <FeatureListItem icon={<PrivacyIcon />} title="No Personally Identifiable Information Stored">
                    Our system is designed to work without storing PII, meaning your core identity information remains private.
                </FeatureListItem>
                <FeatureListItem icon={<FilterIcon />} title="GPT Responses Monitored">
                    All AI-generated responses are filtered and monitored for safety, accuracy, and appropriateness within the NDIS context.
                </FeatureListItem>
                <FeatureListItem icon={<HandshakeIcon />} title="NDIS Code of Conduct">
                    Our team and any partners we work with are committed to upholding the NDIS Code of Conduct.
                </FeatureListItem>
            </div>
        </div>
        {/* Added DownArrow, removed the CTA button */}
        <DownArrow onClick={() => scrollTo('#faq-section')} />
    </div>
  );
};

export default SecuritySection;