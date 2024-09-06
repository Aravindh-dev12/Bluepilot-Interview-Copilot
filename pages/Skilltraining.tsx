import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative h-screen bg-gradient-to-b from-indigo-600 via-purple-500 to-pink-400 flex items-center">
      <div className="container mx-auto px-6 flex flex-col-reverse md:flex-row md:justify-between items-center">
        {/* Left Side: Text Section */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-white text-5xl font-extrabold mb-4 leading-tight">
            Unlock Your Soft Skills Potential
          </h1>
          <p className="text-gray-200 mb-6 text-lg">
            Join 550,000+ professionals globally in honing leadership, public speaking, and more with immersive and AI-powered training.
          </p>
          <div className="flex justify-center md:justify-start space-x-4">
            <button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300">
              Get Started
            </button>
            <button className="bg-white text-purple-600 font-semibold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300">
              Learn More
            </button>
          </div>
        </div>
        
        {/* Right Side: Image Section */}
        <div className="md:w-1/2 flex justify-center items-center mt-8 md:mt-0 relative">
          <div className="relative group hover:scale-105 transition-transform duration-300">
            <img src="/characters.png" alt="Group of characters" className="w-80 md:w-96 border-4 border-white rounded-lg shadow-2xl" />
            <div className="absolute top-4 right-4 h-12 w-12 bg-white rounded-full flex justify-center items-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
              <img src="/brain-icon.png" alt="Brain Icon" className="h-8 w-8" />
            </div>
          </div>
        </div>
      </div>

      {/* Partner Logos */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-20 py-4 px-6 rounded-lg shadow-lg backdrop-blur-sm">
        <div className="flex justify-center items-center space-x-6">
          <img src="/wilhelmsen.png" alt="Wilhelmsen" className="h-8" />
          <img src="/vodafone.png" alt="Vodafone" className="h-8" />
          <img src="/deutsche-telekom.png" alt="Deutsche Telekom" className="h-8" />
          <img src="/ie-business-school.png" alt="IE Business School" className="h-8" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
