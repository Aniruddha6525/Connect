
import React from 'react';
import { Link } from 'react-router-dom';
// import AnimatedConnectedWorldSVG from '../components/AnimatedConnectedWorldSVG';
const onlineWorldImage = '/images/Online-World.png';

const FeatureIcon = ({ children }) => (
  <div className="bg-orange-100 text-orange-600 rounded-full h-16 w-16 flex items-center justify-center mb-6">{children}</div>
);

const TrackIcon = ({ children }) => (
  <div className="bg-teal-100 text-teal-700 rounded-lg h-12 w-12 flex items-center justify-center mb-4">{children}</div>
);

const TrackCard = ({ title, description, icon }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
    <TrackIcon>{icon}</TrackIcon>
    <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <a href="#" className="font-semibold text-orange-600 hover:text-orange-500">Learn More →</a>
  </div>
);

const TestimonialCard = ({ quote, name, role, initials }) => (
  <div className="bg-white p-8 rounded-xl shadow-lg relative overflow-hidden">
    <svg className="absolute top-4 right-4 w-24 h-24 text-gray-100 opacity-80 z-0 transform -rotate-12" fill="currentColor" viewBox="0 0 24 24">
      <path d="M6 17h3l2-4V7H5v6h3l-2 4zm8 0h3l2-4V7h-6v6h3l-2 4z" />
    </svg>
    <div className="relative z-10">
      <p className="text-lg text-gray-700 italic mb-6">"{quote}"</p>
      <div className="flex items-center">
        <span className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-semibold text-xl">{initials}</span>
        <div className="ml-4">
          <p className="font-semibold text-gray-900">{name}</p>
          <p className="text-sm text-orange-600 font-medium">{role}</p>
        </div>
      </div>
    </div>
  </div>
);


const LandingPage = () => {
  return (
    // Base background color for the entire page
    <div className="bg-gray-50 text-gray-900 antialiased">
      
      {/* --- Hero Section --- */}
      

  <section className="relative py-24 sm:py-32 overflow-hidden">
        
        {/* --- FAINT BACKGROUND ELEMENT --- */}
        <div 
          className="absolute inset-0 -z-10 bg-gradient-radial from-purple-100/30 via-teal-50/10 to-gray-50 blur-3xl opacity-70" 
          aria-hidden="true"
        />


        <div className="relative container mx-auto px-6 z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            
            {/* --- Column 1: Text Content (Animations remain) --- */}
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                <span className="block opacity-0 animate-fade-in-up">
                  Find Your Path,
                </span>
                <span 
                  className="block opacity-0 animate-fade-in-up text-orange-600 hover:text-red-600 transition duration-300" 
                  style={{ animationDelay: '200ms' }}
                >
                  Together.
                </span>
              </h1>
              <p 
                className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto md:mx-0 
                           opacity-0 animate-fade-in-up"
                style={{ animationDelay: '400ms' }}
              >
                Connect is the ultimate platform for students and professionals to find mentors, join exclusive workshops, and grow their careers.
              </p>
              <Link
                to="/login"
                className="mt-8 inline-block bg-orange-600 hover:bg-teal-600 text-white font-bold py-4 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105 shadow-lg opacity-0 animate-fade-in-up"
                style={{ animationDelay: '600ms' }}
              >
                Get Started for Free
              </Link>
            </div>

            {/* --- Column 2: Animated SVG --- */}
            {/* Replaced <img> with the new component */}
            <div className="flex justify-center items-center space-x-6">
              {/* <AnimatedConnectedWorldSVG /> */}
              <img src="/images/Innovation-amico.png" alt="Innovation" className="hidden md:block w-3/4 h-auto" />
            </div>

          </div>
        </div>
      </section>

      
      {/* --- Features Section --- */}
      <section className="relative bg-white py-24 sm:py-32 overflow-hidden">
        {/* ... (rest of your file) ... */}
        {/* (No changes below this point) */}
        
        {/* Subtle Dot-Grid Background */}
        <div className="absolute inset-0 w-full h-full bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-20 -z-10" />

        <div className="relative container mx-auto px-6 z-10">
          <h2 className="text-3xl font-bold text-center text-orange-600 mb-16">
            Why Choose Connect?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16 text-center">
            {/* Feature 1 */}
            <div className="flex flex-col items-center">
              <FeatureIcon>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197M15 11a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </FeatureIcon>
              <h3 className="text-xl font-semibold mb-2">Expert Mentors</h3>
              <p className="text-gray-600">
                Connect with experienced professionals from various fields ready to guide you.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="flex flex-col items-center">
              <FeatureIcon>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </FeatureIcon>
              <h3 className="text-xl font-semibold mb-2">Exclusive Events</h3>
              <p className="text-gray-600">
                Participate in webinars, workshops, and Q&A sessions hosted by industry leaders.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="flex flex-col items-center">
              <FeatureIcon>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </FeatureIcon>
              <h3 className="text-xl font-semibold mb-2">Vibrant Community</h3>
              <p className="text-gray-600">
                Join forums, collaborate on projects, and network with peers in a supportive environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- NEW SECTION: Global Connection with Image 2 --- */}
      <section className="bg-white py-24 sm:py-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Column 1: Text Content */}
            <div className="text-center md:text-left md:order-first"> {/* 'md:order-first' places text before image on desktop */}
              <h2 className="text-3xl font-bold text-orange-600 mb-4">
                Connect Globally, Learn Universally
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Break geographical barriers and access a diverse network of mentors and peers from around the world. Expand your horizons with international perspectives and opportunities.
              </p>
              <Link
                to="/global-community"
                className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105 shadow-lg"
              >
                Join Our Global Community
              </Link>
            </div>

            {/* Column 2: Image 2 (Global Network) */}
            <div className="flex justify-center items-center md:order-last">
              <img src={onlineWorldImage} alt="Global Network and Digital Communication" className="w-full h-auto max-w-lg animate-float" />
            </div>
          </div>
        </div>
      </section>

      {/* --- Education Domain Section: "Popular Tracks" --- */}
      <section className="bg-gray-50 py-24 sm:py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-orange-600 mb-4">
              Explore Popular Tracks
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find mentors and resources based on the career path you want to pursue.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TrackCard
              title="Software Development"
              description="From web basics to advanced AI, find mentors to guide your coding journey."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              }
            />
            <TrackCard
              title="Data Science & Analytics"
              description="Learn to wrangle big data, build models, and create insightful visualizations."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
              }
            />
            <TrackCard
              title="Design & UX/UI"
              description="Master the art of user-centric design, from wireframes to high-fidelity prototypes."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              }
            />
          </div>
        </div>
      </section>

      {/* --- How It Works Section --- */}
      <section className="bg-white py-24 sm:py-32">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-orange-600 mb-16">
            Get Started in 3 Easy Steps
          </h2>
          <div className="relative">
            {/* Dotted line connector */}
            <div className="hidden md:block absolute top-12 left-0 w-full border-t-2 border-dashed border-gray-300"></div>
            
            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-y-16 md:gap-y-0 md:gap-x-12 text-center">
              {/* Step 1 */}
              <div className="flex flex-col items-center">
                <div className="bg-white border-2 border-orange-600 rounded-full h-24 w-24 flex items-center justify-center text-3xl font-bold text-orange-600 mb-6 z-10 shadow-md">1</div>
                <h3 className="text-xl font-semibold mb-2">Create Your Account</h3>
                <p className="text-gray-600">Sign up as either a mentor or a mentee and set up your profile.</p>
              </div>
              {/* Step 2 */}
              <div className="flex flex-col items-center">
                <div className="bg-white border-2 border-orange-600 rounded-full h-24 w-24 flex items-center justify-center text-3xl font-bold text-orange-600 mb-6 z-10 shadow-md">2</div>
                <h3 className="text-xl font-semibold mb-2">Find Your Match</h3>
                <p className="text-gray-600">Browse profiles, explore interests, and connect with the right person for you.</p>
              </div>
              {/* Step 3 */}
              <div className="flex flex-col items-center">
                <div className="bg-white border-2 border-orange-600 rounded-full h-24 w-24 flex items-center justify-center text-3xl font-bold text-orange-600 mb-6 z-10 shadow-md">3</div>
                <h3 className="text-xl font-semibold mb-2">Start Growing</h3>
                <p className="text-gray-600">Engage in meaningful conversations, join events, and achieve your goals.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Testimonials --- */}
      <section className="bg-gray-50 py-24 sm:py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-orange-600 mb-4">
              Hear From Our Community
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real stories from students and professionals who found their path on Connect.
            </p>
          </div>
          
          {/* Responsive Grid for Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <TestimonialCard
              quote="Finding a mentor in my niche seemed impossible. Connect matched me with a senior engineer in just one day. It's been a game-changer for my career."
              name="Parthavi G."
              initials="PG"
              role="Mentee, Software Engineering"
            />
            
            {/* Testimonial 2 */}
            <TestimonialCard
              quote="As a mentor, it's incredibly rewarding to give back. The platform makes it easy to manage sessions and connect with motivated students."
              name="Alex M."
              initials="AM"
              role="Mentor, Product @ TechCorp"
            />
            
            {/* Testimonial 3 */}
            <TestimonialCard
              quote="The exclusive workshops are fantastic. I learned more about System Design in one 2-hour session than I did in an entire semester."
              name="Priya S."
              initials="PS"
              role="Student, Computer Science"
            />
          </div>
        </div>
      </section>

      {/* --- Call to Action Section --- */}
      <section className="bg-gradient-to-r from-orange-500 to-teal-500 py-24 sm:py-32">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">
            Ready to Take the Next Step?
          </h2>
          <p className="text-xl text-white/90 mb-10">
            Join a growing community of learners and leaders today.
          </p>
          <Link
            to="/login"
            className="bg-white hover:bg-gray-100 text-orange-600 font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105 shadow-lg"
          >
            Sign Up Now
          </Link>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-gray-50 py-16">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-600 text-sm">&copy; {new Date().getFullYear()} Connect. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-6">
            <Link to="/contact" className="text-sm font-medium text-orange-600 hover:text-orange-500 transition duration-300">Contact</Link>
            <Link to="/privacy" className="text-sm font-medium text-orange-600 hover:text-orange-500 transition duration-300">Privacy Policy</Link>
            <Link to="/terms" className="text-sm font-medium text-orange-600 hover:text-orange-500 transition duration-300">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;