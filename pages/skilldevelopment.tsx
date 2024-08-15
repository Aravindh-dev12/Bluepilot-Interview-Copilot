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
      <section id="hero" className="text-black py-16">
        <div className="container mx-auto text-center">
           <h2 className="text-4xl md:text-4xl font-bold mb-4 text-gray-800">
              UNLOCK YOUR FULL POTENTIAL
            </h2>
            <p className="text-2xl mb-12 bg-gradient-to-r from-[#000000] to-[#000000] bg-clip-text text-transparent">Personalized AI-driven skill development <span className="bg-gradient-to-r from-[#4895ef] to-[#c77dff] bg-clip-text text-transparent"> tailored to your goals</span></p>
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
