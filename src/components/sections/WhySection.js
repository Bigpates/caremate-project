import React from 'react';
import DownArrow from '../DownArrow';

const storyData = [
  { question: "Feeling lost in your NDIS plan?", quote: "For the first time, I feel in control of my own NDIS journey. It's life-changing.", author: "NDIS Participant" },
  { question: "Buried in paperwork instead of helping clients?", quote: "The document generation feature is a lifesaver. It saves me hours of work each week.", author: "Support Coordinator" },
  { question: "Struggling to track and verify spending?", quote: "We were letting thousands in funding go to waste. Now we have a clear strategy and can verify everything.", author: "Plan Manager" },
  { question: "Not sure you're getting the right support?", quote: "CareMate helped me find services I wasn't even aware I was eligible for. It's like having an expert on my side.", author: "Self-Managed Participant" }
];

const WhySection = ({ scrollTo }) => {
  return (
    <div id="why-section" className="relative flex flex-col justify-center p-4 py-24 min-h-screen">
      <div className="max-w-6xl mx-auto w-full space-y-24 md:space-y-32">
        {storyData.map((story, index) => (
          <div key={index} className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="text-left">
              <h2 className="text-4xl md:text-5xl font-bold text-primary-text">
                {story.question}
              </h2>
            </div>
            <div className="text-left border-l-4 border-primary pl-8">
              <p className="text-xl text-secondary-text leading-relaxed">
                "{story.quote}"
              </p>
              <p className="mt-4 text-sm font-semibold text-primary-text">- {story.author}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
         <DownArrow onClick={() => scrollTo('#what-we-do-section')} />
      </div>
    </div>
  );
};

export default WhySection;