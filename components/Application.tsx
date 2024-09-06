import React from 'react';
import Link from 'next/link'; 

const AiQuestionBank: React.FC = () => {
  return (
    <div className="h-auto flex items-center justify-center py-14 bg-[#F5F5F5]">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 pt-16">
        <div className="w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
          <div className="flex flex-col">
            <div className="p-6">
              <h1 className="text-3xl md:text-4xl font-extrabold text-black mb-4">
                <span className="text-gray-800">“</span>
              </h1>
              <h1 className="text-3xl md:text-3xl font-extrabold text-black mb-8">
                <span className="text-gray-800">ENHANCE YOUR SKILLS WITH OUR COMPREHENSIVE</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4895ef] to-[#c77dff] ml-2">
                  AI QUESTION BANK
                </span>
              </h1>
            </div>
            <div className="flex flex-col justify-end flex-grow p-6">
              <div className="text-lg md:text-xl mb-6">
                <p className="text-gray-700">
                  Access a comprehensive collection of AI-related questions and answers, <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4895ef] to-[#c77dff]"> designed to prepare you for interviews and enhance your AI expertise </span> to help you excel in your AI career.
                </p>
              </div>
              <div className="mt-6">
                <Link href="/AIQuestionBank">
                  <button
                    className="bg-btn-grad text-black bg-[length:200%] bg-left transition-bg duration-500 hover:bg-right rounded-full px-4 py-3 text-lg w-56 sm:w-40"
                  >
                    Explore Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center bg-[#E9EBF2]">
          <img
            src="/path/to/your/image.jpg"
            alt="AI Question Bank"
            className="rounded-lg shadow-lg w-full h-auto max-w-md"
          />
        </div>
      </div>
    </div>
  );
};

export default AiQuestionBank;
