import React from 'react';
import { Link } from 'react-router-dom';

import TestimonialCard from '../components/TestimonialCard'; 

const BenefitIcon = ({ children }) => (
  <div className="bg-teal-100 text-teal-600 rounded-full h-16 w-16 flex items-center justify-center mb-6">
    {children}
  </div>
);

const GlobeIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m0 0a9 9 0 019-9m-9 9a9 9 0 009 9" /></svg>
);
const UsersIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
);
const SparklesIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
);


const GlobalCommunityPage = () => {
  return (
    <div className="bg-gray-50 text-gray-900 antialiased">
      
      {/* --- Hero Section --- */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        {/* Decorative Background Blob */}
        <div className="absolute top-10 -left-20 w-72 h-72 bg-orange-100 rounded-full opacity-50 blur-3xl -z-10" />

        <div className="relative container mx-auto px-6 z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Column 1: Text Content */}
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-orange-600">
                Connect Globally,
              </h1>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-gray-900 mt-2">
                Learn Universally.
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-lg mx-auto md:mx-0">
                Break geographical barriers and access a diverse network of mentors, peers, and opportunities from around the world.
              </p>
              <Link
                to="/signup" // Links to your signup page
                className="mt-10 inline-block bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105 shadow-lg"
              >
                Join the Community
              </Link>
            </div>

            {/* Column 2: Illustration */}
            <div className="flex justify-center items-center">
              <img
              src="/images/Online-world-amico.png" 
              alt="Global Network and Digital Communication"
              className="w-full h-auto max-w-lg animate-float"
            />
            </div>
          </div>
        </div>
      </section>

      {/* --- Benefits Section --- */}
      <section className="bg-white py-24 sm:py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-orange-600 mb-4">
              Discover a World of Opportunity
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Joining our global community isn't just about networking. It's about fundamentally changing how you learn and grow.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16 text-center">
            {/* Benefit 1 */}
            <div className="flex flex-col items-center">
              <BenefitIcon><GlobeIcon /></BenefitIcon>
              <h3 className="text-xl font-semibold mb-2">Gain Diverse Perspectives</h3>
              <p className="text-gray-600">
                Learn from mentors and peers with unique cultural and professional backgrounds you won't find in your local city.
              </p>
            </div>
            {/* Benefit 2 */}
            <div className="flex flex-col items-center">
              <BenefitIcon><UsersIcon /></BenefitIcon>
              <h3 className="text-xl font-semibold mb-2">Build a Global Network</h3>
              <p className="text-gray-600">
                Connect with industry leaders, innovators, and changemakers from different countries, time zones, and markets.
              </p> {/* <--- THIS WAS THE FIX (was </s'}>) */}
            </div>
            {/* Benefit 3 */}
            <div className="flex flex-col items-center">
              <BenefitIcon><SparklesIcon /></BenefitIcon>
              <h3 className="text-xl font-semibold mb-2">Enhance Cultural Fluency</h3>
              <p className="text-gray-600">
                Develop the crucial soft skills and global mindset that are highly valued in today's remote-first workforce.
              </p>
            </div>
          </div>
        </div>
      </section>

        {/* --- Testimonials Section --- */}
      {/* This reuses the TestimonialCard component */}
      <section className="bg-gray-50 py-24 sm:py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-orange-600 mb-4">
              From Our Global Members
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Check if TestimonialCard component is imported correctly */}
            {TestimonialCard ? (
              <>
                <TestimonialCard
                  quote="Connecting with a mentor from Berlin while I'm in Mumbai... that's something only 'Connect' made possible. The insights into the European tech scene are invaluable."
                  name="Rohan K."
                  initials="RK"
                  role="Mentee, India"
                />
                <TestimonialCard
                  quote="As a mentor in London, I get to guide students from Brazil and Japan. The diversity of questions and the fresh energy they bring is incredible. It's a two-way learning street."
                  name="Emily S."
                  initials="ES"
                  role="Mentor, United Kingdom"
                />
              </>
            ) : (
              <p className="text-center text-red-500 md:col-span-2">Error: TestimonialCard component not loaded.</p>
            )}
          </div>
        </div>
      </section> 

      {/* --- Final CTA Section --- */}
      <section className="bg-gradient-to-r from-orange-500 to-teal-500 py-24 sm:py-32">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">
            Ready to Expand Your Horizons?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-xl mx-auto">
            Your international network of peers, mentors, and opportunities is waiting for you.
          </p>
          <Link
            to="/signup"
            className="bg-white hover:bg-gray-100 text-orange-600 font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105 shadow-lg"
          >
            Get Started for Free
          </Link>
        </div>
      </section>
      
    </div>
  );
};

export default GlobalCommunityPage;