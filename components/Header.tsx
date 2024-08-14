"use client";

import React, { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="flex justify-between items-center p-6 border-b border-gray-300 bg-gray-50 relative">
      {/* Wrap "BluePilot" in an <a> tag to link to the home page */}
      <a href="/" className="text-2xl font-bold font-itc-bauhaus">
        BluePilot
      </a>

      {/* Sign up button for small screens */}
      <div className="md:hidden flex items-center space-x-2">
        <button className="px-4 py-2 border-2 border-gray-800 rounded-full text-lg hover:bg-gray-200">
          Sign up
        </button>
        <button onClick={toggleMenu} className="focus:outline-none">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
      <nav className="hidden md:flex space-x-16 text-lg">
        <a href="#interviewcopilot" className="hover:underline">AI Interview Copilot</a>
        <a href="#Ai skill development" className="hover:underline">AI Skill Development</a>
        <a href="#realworld" className="hover:underline">AI Contextual Questions</a>
      </nav>
      <button className="hidden md:block px-4 py-2 border-2 border-gray-800 rounded-full text-lg hover:bg-gray-200">
        Sign up
      </button>

      {menuOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          <button 
            onClick={toggleMenu} 
            className="absolute top-4 right-4 text-gray-600 text-3xl"
          >
            &times;
          </button>
          <nav className="flex flex-col items-start space-y-14 p-6 mt-20">
            <a href="#interviewcopilot" className="text-3xl" onClick={toggleMenu}>AI Interview Copilot</a>
            <a href="#about" className="text-3xl" onClick={toggleMenu}>AI Skill Development</a>
            <a href="#about" className="text-3xl" onClick={toggleMenu}>AI Contextual Questions</a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
