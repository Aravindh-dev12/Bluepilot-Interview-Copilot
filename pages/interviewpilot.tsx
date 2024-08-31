import React from 'react';
import '../app/globals.css';

const InterviewAssistant = () => {
  return (
    <div className="p-6 h-full">
      {/* Real-time Interview Copilot Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Feature items can be added here */}
      </div>

      {/* Additional Tools */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white p-6 rounded-lg shadow-md hover:scale-105 transition-transform cursor-pointer">
          <h3 className="text-lg font-semibold text-gray-800 bg-gradient-to-r from-[#4895ef] to-[#c77dff] bg-clip-text text-transparent">Transcription Text Editing</h3>
          <p className="text-gray-600 mt-8 text-sm"> {/* Increased margin-top */}
            Edit transcribed text in real-time to ensure accuracy and clarity, making your responses even more precise
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md hover:scale-105 transition-transform cursor-pointer">
          <h3 className="text-lg font-semibold text-gray-800 bg-gradient-to-r from-[#4895ef] to-[#c77dff] bg-clip-text text-transparent">Toggle Between Copilot and Summarizer Modes</h3>
          <p className="text-gray-600 mt-8 text-sm"> {/* Increased margin-top */}
            Switch between modes to either get detailed assistance or concise summaries of key points during the interview
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md hover:scale-105 transition-transform cursor-pointer">
          <h3 className="text-lg font-semibold text-gray-800 bg-gradient-to-r from-[#4895ef] to-[#c77dff] bg-clip-text text-transparent">Real-time Interview Copilot</h3>
          <p className="text-gray-600 mt-8
          
           text-sm"> {/* Increased margin-top */}
            A web application that assists users in crafting responses during interviews, leveraging real-time audio transcription and AI-powered generation for relevant and concise answers
          </p>
        </div>
      </div>
    </div>
  );
};

export default InterviewAssistant;
