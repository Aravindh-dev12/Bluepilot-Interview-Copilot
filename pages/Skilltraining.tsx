import React from 'react';
import '../app/globals.css';

const VirtualHumanTeaching: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <header className="bg-blue-600 text-white w-full py-4">
        <h1 className="text-3xl font-bold text-center">Virtual Human Soft Skills Training</h1>
      </header>

      <main className="flex-grow container mx-auto p-6">
        <section className="bg-white rounded-lg shadow-lg p-6 mb-6 flex items-center">
          <div className="flex-shrink-0">
            {/* Replace with an actual avatar image */}
            <img
              src="https://via.placeholder.com/150"
              alt="Virtual Human"
              className="w-40 h-40 rounded-full object-cover"
            />
          </div>
          <div className="ml-6">
            <h2 className="text-2xl font-semibold mb-4">Welcome to Your Soft Skills Training</h2>
            <p className="text-gray-700 mb-4">
              Hi, I'm your Virtual Human assistant. I'm here to guide you through interactive
              lessons to enhance your soft skills. Let's work together to improve your communication,
              empathy, and leadership abilities.
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Start Training
            </button>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Today's Lesson: Effective Communication</h3>
          <p className="text-gray-700 mb-4">
            Effective communication is essential for personal and professional success. In this lesson,
            you will learn key techniques for clear and impactful communication.
          </p>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            View Lesson
          </button>
        </section>
      </main>

      <footer className="bg-gray-800 text-white w-full py-4 text-center">
        <p>&copy; 2024 Virtual Human Training. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default VirtualHumanTeaching;
