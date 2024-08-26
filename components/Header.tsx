"use client";

import React, { useState } from "react";
import Link from "next/link";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="flex justify-between items-center p-6 border-b border-gray-300 bg-gray-50 relative">
      {/* Wrap "BluePilot" in a <Link> component */}
      <Link href="/" className="text-2xl font-bold font-itc-bauhaus">
        BluePilot
      </Link>

      {/* Sign up button for small screens */}
      <div className="md:hidden flex items-center space-x-2">
        <Link href="/signup" className="bg-btn-grad text-white bg-[length:200%] bg-left transition-bg duration-500 hover:bg-right rounded-full px-4 py-2 text-lg">
          Sign up
        </Link>
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

      {/* Desktop navigation */}
      <nav className="hidden md:flex space-x-16 text-lg">
        <Link href="/interviewcopilot" className="hover:underline">AI Interview Copilot</Link>
        <Link href="/skilldevelopment" className="hover:underline">AI Skill Development</Link>
        <Link href="/JobApplicationTailor" className="hover:underline flex items-center">
          AI Application Optimizer
          <span className="ml-2 bg-yellow-300 text-xs text-gray-800 px-2 py-1 rounded-full">
            Beta
          </span>
        </Link>
      </nav>

      {/* Sign up button for desktop */}
      <Link href="/signup" className="hidden md:block px-4 py-2 border-2 border-gray-800 rounded-full text-lg hover:bg-gray-200">
        Sign up
      </Link>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          <button 
            onClick={toggleMenu} 
            className="absolute top-4 right-4 text-gray-600 text-3xl"
          >
            &times;
          </button>
          <nav className="flex flex-col items-start space-y-6 p-6 mt-20">
            <Link href="/interviewcopilot" className="text-2xl" onClick={toggleMenu}>AI Interview Copilot</Link>
            <Link href="/skilldevelopment" className="text-2xl" onClick={toggleMenu}>AI Skill Development</Link>
            <Link href="/JobApplicationTailor" className="text-2xl flex items-center" onClick={toggleMenu}>
              AI Application Optimizer
              <span className="ml-2 bg-yellow-300 text-xs text-gray-800 px-2 py-1 rounded-full">
                Beta
              </span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
