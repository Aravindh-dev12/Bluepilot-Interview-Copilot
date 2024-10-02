import React from 'react';
import '../app/globals.css';

const HomePage: React.FC = () => {
  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-screen" style={{ backgroundImage: "url('/path/to/hero-image.jpg')" }}>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative container mx-auto px-4 text-white flex items-center justify-center h-full">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Improve Your Soft Skills with Virtual Training</h1>
            <p className="text-lg md:text-xl mb-8">
              Learn communication, leadership, and other skills in immersive virtual environments.
            </p>
            <a href="#" className="bg-blue-600 py-3 px-8 rounded-full text-white font-semibold hover:bg-blue-500 transition">
              Get Started
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Why VirtualSpeech?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white shadow-md rounded-lg p-6">
              <img src="/path/to/icon1.png" alt="Icon 1" className="h-16 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-center mb-2">Realistic Simulations</h3>
              <p className="text-center">Practice in virtual environments that replicate real-life scenarios.</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <img src="/path/to/icon2.png" alt="Icon 2" className="h-16 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-center mb-2">Effective Learning</h3>
              <p className="text-center">Build essential skills through guided training programs.</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <img src="/path/to/icon3.png" alt="Icon 3" className="h-16 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-center mb-2">Track Your Progress</h3>
              <p className="text-center">Monitor your progress and receive feedback in real time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Training Courses Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Training Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src="/path/to/course1.jpg" alt="Course 1" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Public Speaking</h3>
                <p>Overcome your fear of public speaking with virtual scenarios designed for improvement.</p>
                <a href="#" className="text-blue-600 font-semibold mt-4 block hover:underline">Learn More</a>
              </div>
            </div>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src="/path/to/course2.jpg" alt="Course 2" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Leadership Training</h3>
                <p>Develop leadership skills and manage teams in immersive virtual environments.</p>
                <a href="#" className="text-blue-600 font-semibold mt-4 block hover:underline">Learn More</a>
              </div>
            </div>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src="/path/to/course3.jpg" alt="Course 3" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Negotiation Skills</h3>
                <p>Learn and practice effective negotiation strategies in realistic virtual settings.</p>
                <a href="#" className="text-blue-600 font-semibold mt-4 block hover:underline">Learn More</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white shadow-md rounded-lg p-6">
              <p className="mb-4">"VirtualSpeech transformed the way I approach public speaking. It was a game-changer for me!"</p>
              <h4 className="font-semibold">- User 1</h4>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <p className="mb-4">"The leadership training was so realistic, I felt like I was managing a real team!"</p>
              <h4 className="font-semibold">- User 2</h4>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <p className="mb-4">"Negotiation training helped me in my career. I can't recommend VirtualSpeech enough."</p>
              <h4 className="font-semibold">- User 3</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 VirtualSpeech. All rights reserved.</p>
          <div className="mt-4">
            <a href="#" className="text-gray-400 hover:text-white mx-2">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white mx-2">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
