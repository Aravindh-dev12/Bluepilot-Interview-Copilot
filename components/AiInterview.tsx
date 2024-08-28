import React from 'react';
import Link from 'next/link';

const AiInterview: React.FC = () => {
  return (
    <div className="h-auto flex flex-col items-center justify-center py-8 bg-[#F5F5F5]">
      <div className="w-full text-center mb-12">
        <h1 className="text-2xl md:text-4xl font-extrabold text-black">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4895ef] to-[#c77dff] backdrop-blur-md">
        ELEVATE YOUR TALENT
            </span>
            <span className="text-gray-800 ml-2">
            STRATEGY WITH ADVANCED AI CAPABILITIES
            </span>
        </h1>
      </div>

      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 mt-12"> 
        
        <div className="w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
          <div className="flex flex-col">
            <div className="p-6">
              <h1 className="text-3xl md:text-4xl font-extrabold text-black mb-4">
                <span className="text-gray-800">“</span>
              </h1>
              <h1 className="text-3xl md:text-3xl font-extrabold text-black mb-8">
                <span className="text-gray-800">REVOLUTIONIZE INTERVIEWS WITH</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4895ef] to-[#c77dff] ml-2">
                  AI ASSISTANCE
                </span>
              </h1>
            </div>
            <div className="flex flex-col justify-end flex-grow p-6">
              <div className="text-lg md:text-xl mb-6">
                <p className="text-gray-700">
                Bluepilot Interview Copilot is an advanced tool that <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4895ef] to-[#c77dff]">  combines real-time audio transcription </span> with AI-powered responses to enhance interview preparation and boost performance with tailored feedback
                </p>
              </div>
              <div className="mt-6">
                <Link href="/interviewcopilot">
                <button
                  className="bg-btn-grad text-black bg-[length:200%] bg-left transition-bg duration-500 hover:bg-right rounded-full px-4 py-3 text-lg w-56 sm:w-40"
                >
                  Get Started
                </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center bg-[#E9EBF2]">
          <img
            src="/path/to/your/image.jpg"
            alt="Resume Editor"
            className="rounded-lg shadow-lg w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default AiInterview;
