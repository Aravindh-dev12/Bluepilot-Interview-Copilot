import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from 'next/router';
import '../app/globals.css';

const SkillAssessmentPage: React.FC = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/SkillAssesment');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-10 to-blue-200 text-gray-900">
      <Header />
      <section className="py-16">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-5xl md:text-5xl font-extrabold mb-6 text-gray-800">
            Unlock Your Potential
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-gray-700">
            Receive detailed tutorials and practical examples to advance <span className="bg-gradient-to-r from-[#4895ef] to-[#c77dff] bg-clip-text text-transparent">your skills and career goals</span>
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-btn-grad text-black px-4 py-6 text-lg w-64 rounded-full bg-[length:200%] bg-left transition-bg duration-500 hover:bg-right rounded-full"
          >
            Get Started
          </button>
        </div>
      </section>

      <div className="container mx-auto px-4 mb-12">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">
          Key Features
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="flex flex-col items-center p-8 w-full md:w-[300px] min-h-[350px]">
            <div className="rounded-full p-4 mb-4">
              <img src="/tutorials.png" alt="Detailed Tutorials" className="h-16 w-16" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Detailed Tutorials
            </h3>
            <p className="text-gray-500 text-center">
              Comprehensive tutorials covering fundamental concepts, explanations, syntax, and practical examples.
            </p>
          </div>
          <div className="flex flex-col items-center p-8 w-full md:w-[300px] min-h-[350px]">
            <div className="rounded-full p-4 mb-4">
              <img src="/learning.png" alt="Practical Examples" className="h-16 w-16" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Practical Examples
            </h3>
            <p className="text-gray-500 text-center">
              A list of practical examples and scenarios with explanations to help apply and understand concepts.
            </p>
          </div>
          <div className="flex flex-col items-center p-8 w-full md:w-[300px] min-h-[350px]">
            <div className="rounded-full p-4 mb-4">
              <img src="/growth.png" alt="Skill Growth" className="h-16 w-16" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Skill Growth
            </h3>
            <p className="text-gray-500 text-center">
              Personalized content designed to enhance and grow your skills and career goals based on your input.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SkillAssessmentPage;
