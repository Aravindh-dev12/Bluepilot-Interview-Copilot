import React from 'react';

const AiInterview: React.FC = () => {
  return (
    <div className="h-custom flex items-center justify-center py-8 bg-[#F5F5F5]">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">


        <div className="flex items-center justify-center bg-[#E9EBF2]">
          <img
            src="/path/to/your/image.jpg"
            alt="Resume Editor"
            className="rounded-lg shadow-lg transform rotate-[-3deg]"
          />
        </div>


        <div className="w-full md:w-[700px] mx-auto bg-white shadow-lg rounded-lg overflow-hidden h-[600px] flex flex-col">
          <div className="flex flex-col h-full">
            {/* Heading Section */}
            <div className="p-6">
              <h1 className="text-4xl md:text-4xl font-extrabold text-black mb-8 font-Informal011 BT">
                <span className="text-gray-800">
                  REVOLUTIONIZE INTERVIEWS WITH
                </span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4895ef] to-[#c77dff] backdrop-blur-md ml-2">
                  AI ASSISTANCE
                </span>
              </h1>
            </div>
            {/* Content Section */}
            <div className="flex flex-col justify-end flex-grow p-6">
              <div className="text-1.5xl mb-6">
                <p className="text-gray-700">
                  Bluepilot Interview Copilot is a sophisticated web application crafted to assist users in formulating articulate and effective responses during interviews. By integrating cutting-edge <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4895ef] to-[#c77dff] backdrop-blur-md">real-time audio transcription technology</span> with advanced AI-powered response generation, it offers tailored, precise, and relevant answers, significantly enhancing interview preparation and boosting overall performance through personalized and insightful feedback.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiInterview;
