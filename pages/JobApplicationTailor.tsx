import React from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from "../components/Footer";
import '../app/globals.css';

const AIJobApplicationTailor: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <Header />
      
      {/* Page Heading Section */}
      <div className="text-center mt-16">
        <h1 className="text-4xl md:text-4xl font-bold mb-4 text-gray-800">
          CRAFTING THE PERFECT FIT FOR SUCCESS
        </h1>
        <p className="text-2xl mb-12 bg-gradient-to-r from-[#000000] to-[#000000] bg-clip-text text-transparent">
          Master the Art of Tailoring AI Job Applications for <span className="bg-gradient-to-r from-[#4895ef] to-[#c77dff] bg-clip-text text-transparent">Optimal Success in a Competitive Market</span>
        </p>
      </div>
      
      {/* Main Content Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-40 mt-20">
        
        {/* Top Section */}
        <div className="flex flex-col justify-center">
          <img src="/path/to/icon-ai.png" alt="AI Icon" className="mb-6 w-16 h-16" />
          <div className="flex space-x-6">
            {/* Cards */}
            <div className="bg-white shadow-md rounded-lg p-4">
              <img src="/path/to/template1.png" alt="Template 1" />
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
              <img src="/path/to/template2.png" alt="Template 2" />
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
              <img src="/path/to/template3.png" alt="Template 3" />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Tailor Your Job Application with AI</h2>
          <p className="text-lg mb-6">Our AI-powered tool helps you create job applications that stand out. Customize your resume, cover letter, and portfolio with AI-driven templates that highlight your strengths and match job descriptions perfectly. Start your journey towards your dream job today</p>
        </div>
        
        {/* Bottom Section */}
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-bold mb-4">Create a Custom Application Path</h2>
          <p className="text-lg mb-6">Our AI Tailor provides personalized recommendations based on your career goals. Build a custom application path that includes tailored job applications, interview prep, and follow-up strategies. Maximize your chances of success with every job application</p>
          {/* Get Started Button */}
        </div>
        <div className="flex justify-center">
          <img src="/path/to/icon-path.png" alt="Custom Path Icon" className="mb-6 w-16 h-16" />
          <div className="bg-white shadow-md rounded-lg p-4">
            <img src="/path/to/custom-application-path.png" alt="Custom Application Path" />
          </div>
        </div>
      </div>
      
      {/* Button with Gap */}
      <div className="flex justify-center w-full mt-20 mb-10"> {/* Added mb-10 for margin-bottom */}
        <Link href="/ApplicationTailor">
          <button
            className="bg-btn-grad text-black bg-[length:200%] bg-left transition-bg duration-500 hover:bg-right rounded-full px-4 py-6 text-lg w-64"
          >
            Get Started
          </button>
        </Link>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AIJobApplicationTailor;
