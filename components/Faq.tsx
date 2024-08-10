'use client';

import React, { useState } from 'react';

const FAQPage: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const faqs = [
    {
      question: "What is Bluepiolt Interview Copilot?",
      answer: "Bluepilot Interview Copilot is a tool designed to enhance interview preparation with real-time feedback and resources."
    },
    {
      question: "How does real-time audio transcription work?",
      answer: "Real-time audio transcription converts spoken words into text during the interview, allowing for more accurate and immediate analysis."
    },
    {
      question: "Can I customize the interview questions?",
      answer: "Yes, you can customize the interview questions based on your needs and the role you're preparing for."
    },
    {
      question: "Is there a mobile app available?",
      answer: "Currently, the tool is available as a web application. We are working on developing a mobile app for future releases."
    },
    {
      question: "How can I contact support?",
      answer: "You can contact support via the 'Contact Us' page on our website or email us at support@Bluepilotinterviewcopilot.com."
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col items-center justify-center p-8">
      <div className="mb-6">
      <h1 className="text-5xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#4895ef] to-[#c77dff]">
        FAQ
      </h1>
      </div>
      <div className="w-full max-w-4xl rounded-lg p-6">
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              onClick={() => toggleFAQ(index)}
              className={`bg-white rounded-lg p-4 cursor-pointer ${index === activeIndex ? 'shadow-lg' : 'shadow-md'} transition-shadow duration-300`}
            >
              <div className="flex justify-between items-center">
                <h2 className={`text-lg font-semibold text-gray-600 hover:text-black transition-colors duration-300 ${index === activeIndex ? 'text-black' : ''}`}>
                  {faq.question}
                </h2>
                <span
                  className={`text-5xl transform transition-transform duration-300 ${index === activeIndex ? 'rotate-45' : ''} ${index === activeIndex ? 'text-blue-500' : 'text-gray-600'} hover:text-black hover:scale-110`}
                >
                  +
                </span>
              </div>
              {index === activeIndex && (
                <p className="text-gray-700 mt-4">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
