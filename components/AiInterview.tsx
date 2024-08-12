import React from 'react';
import Link from 'next/link'; // Make sure to import Link if you're using Next.js

const AiInterview: React.FC = () => {
  return (
    <div className="h-custom flex items-center justify-center py-8 bg-[#F5F5F5]">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Text Section */}
        <div className="w-full md:w-[700px] mx-auto bg-white shadow-lg rounded-lg overflow-hidden h-[600px] flex flex-col">
          <div className="flex flex-col h-full">
            {/* Heading Section */}
            <div className="p-6">
              <h1 className="text-4xl md:text-4xl font-extrabold text-black mb-4 font-Informal011 BT">
                <span className="text-gray-800">“</span>
              </h1>
              <h1 className="text-4xl md:text-4xl font-extrabold text-black mb-8 font-Informal011 BT">
                <span className="text-gray-800">REVOLUTIONIZE INTERVIEWS WITH</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4895ef] to-[#c77dff] backdrop-blur-md ml-2">
                  AI ASSISTANCE
                </span>
              </h1>
            </div>
            {/* Content Section */}
            <div className="flex flex-col justify-end flex-grow p-6">
              <div className="text-1.5xl mb-6">
                <p className="text-gray-700">
                  Bluepilot Interview Copilot is an advanced web application designed to help users craft articulate and effective interview responses. 
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4895ef] to-[#c77dff] backdrop-blur-md"> It combines real-time audio transcription</span> 
                  with AI-powered response generation to provide tailored, relevant answers, enhancing interview preparation and boosting performance through personalized feedback.
                </p>
              </div>
              {/* Button Section */}
              <div className="mt-6">
                <Link href="/get-started">
                  <button
                    className="bg-btn-grad text-white bg-[length:200%] bg-left transition-bg duration-500 hover:bg-right rounded-full px-4 py-3 text-lg w-44"
                  >
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Image Section */}
        <div className="flex items-center justify-center bg-[#E9EBF2]">
          <img
            src="/path/to/your/image.jpg"
            alt="Resume Editor"
            className="rounded-lg shadow-lg transform rotate-[-3deg]"
          />
        </div>
      </div>
    </div>
  );
};

export default AiInterview;
