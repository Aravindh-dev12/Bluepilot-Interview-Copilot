import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import '../app/globals.css';

const SkillMappingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Header />

      {/* Hero Section */}
      <section id="hero" className="text-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-4">Unlock Your Full Potential</h2>
          <p className="text-lg mb-8">Personalized AI-driven skill development tailored to your goals</p>
          <Link href="/assessment">
            <button
              className="bg-btn-grad text-white bg-[length:200%] bg-left transition-bg duration-500 hover:bg-right rounded-full px-4 py-6 text-lg w-64"
            >
              Get Started
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SkillMappingPage;
