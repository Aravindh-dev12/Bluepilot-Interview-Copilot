// src/pages/SkillMapping.tsx

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../app/globals.css';

const SkillDevelopmentPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">

      {/* Hero Section */}
      <section id="hero" className="bg-blue-500 text-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-4">Unlock Your Full Potential</h2>
          <p className="text-lg mb-8">Personalized AI-driven skill development tailored to your goals.</p>
          <a href="#assessment" className="bg-white text-blue-600 py-2 px-4 rounded-lg font-semibold hover:bg-gray-200">Get Started</a>
        </div>
      </section>

      {/* AI-Powered Skill Assessment */}
      <section id="assessment" className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">AI-Powered Skill Assessment</h2>
          <div className="bg-white shadow-lg rounded-lg p-8 mx-auto max-w-md">
            <form>
              <label className="block text-left mb-4">
                <span className="text-gray-700">Enter your skills or career goals:</span>
                <textarea className="form-textarea mt-1 block w-full border-gray-300 rounded-lg" rows={4} placeholder="e.g., 'I want to improve my data science skills'"></textarea>
              </label>
              <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700">Analyze</button>
            </form>
          </div>
        </div>
      </section>

      {/* Resource Recommendations */}
      <section id="resources" className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Curated Learning Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white shadow-lg rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-4">Course 1</h3>
              <p>Learn about data science with this comprehensive course.</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-4">Article 1</h3>
              <p>Read this article to get insights on the latest trends in AI.</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-4">Book 1</h3>
              <p>Enhance your knowledge with this recommended book.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="bg-blue-100 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Success Stories</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md">
              <p className="italic mb-4">"This platform has transformed my career path. The personalized learning paths are incredible!"</p>
              <p className="font-semibold">Jane Doe</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md">
              <p className="italic mb-4">"I achieved my career goals faster with the help of AI-driven recommendations. Highly recommend!"</p>
              <p className="font-semibold">John Smith</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 AI Skill Development. All rights reserved.</p>
          <div className="mt-2">
            <a href="#" className="mr-4 hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SkillDevelopmentPage;
