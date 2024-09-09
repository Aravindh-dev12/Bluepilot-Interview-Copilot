"use client";

import React, { useState } from "react";
import Link from "next/link";
import '../app/globals.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="flex justify-between items-center font-semibold p-6 border-b border-gray-300 bg-gray-50 relative">
      <Link href="/" className="text-2xl">
        Bluepilot
      </Link>
      <div className="md:hidden flex items-center space-x-2">
        <Link href="/signup" className="hidden md:block px-4 py-2 border-2 border-gray-800 rounded-full text-lg hover:bg-gray-200">
          Sign up
        </Link>
        <button
          onClick={toggleMenu}
          aria-label="Toggle menu"
          className="focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-hidden="true"
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
      <nav className="hidden md:flex space-x-16 text-1xl">
        <Link href="/Interviewcopilot" className="hover:underline">Interview Copilot</Link>
        <Link href="/dashboard" className="hover:underline">Skill Development</Link>
        <Link href="/dashboard" className="hover:underline flex items-center"> Question Bank</Link>
        <Link href="/Skilltraining" className="relative flex items-center hover:underline">
          AI SoftSkill Training
        </Link>
      </nav>
      <Link href="/signup" className="hidden md:block px-4 py-2 border-2 border-gray-800 rounded-full text-lg hover:bg-gray-200">
        Sign up
      </Link>
      {menuOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          <button 
            onClick={toggleMenu} 
            aria-label="Close menu"
            className="absolute top-4 right-4 text-gray-600 text-3xl"
          >
            &times;
          </button>
          <nav className="flex flex-col items-start space-y-6 p-6 mt-20">
            <Link href="/Interviewcopilot" className="text-2xl" onClick={toggleMenu}>Interview Copilot</Link>
            <Link href="/dashboard" className="text-2xl" onClick={toggleMenu}>Skill Development</Link>
            <Link href="/dashboard" className="text-2xl flex items-center" onClick={toggleMenu}> Question Bank</Link>
            <Link href="/Skilltraining" className=" text-2xl relative flex items-center hover:underline">
              AI SoftSkill Training
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
