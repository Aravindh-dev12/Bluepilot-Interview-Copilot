"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import Link from "next/link";

export default function HomePage() {
  const isRendered = useRef(false);
  const [showInterviewCopilot, setShowInterviewCopilot] = useState(false);
  const router = useRouter(); 

  useEffect(() => {
    if (isRendered.current) return;
    isRendered.current = true;
  }, []);

  return (
    <main className="relative min-h-screen bg-gray-50">
      {!showInterviewCopilot ? (
        <section className="container mx-auto px-6 py-12 flex flex-col md:flex-row items-center relative">
          <div className="absolute top-0 left-0 w-full border-t border-gray-300"></div>
          <div className="absolute top-0 left-0 h-full border-l border-gray-300"></div>
          
          <div className="flex-1 flex items-center mb-8 md:mb-0">
            <img
              src="/images/image.jpg" 
              alt="Agency Recognition"
              className="w-full h-auto"
            />
          </div>
          <div className="flex-1 text-center md:text-left mt-48 md:mt-17">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-800">
              ACE THE INTERVIEWS USING BLUEPILOT
            </h1>
            <p className="text-lg mb-8">
              Bluepilot: Enhances interviews by providing real-time feedback, suggesting questions, offering preparation tips, and improving efficiency and effectiveness.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <Link href="/interviewcopilot">
                <button
                  className="bg-btn-grad text-black bg-[length:200%] bg-left transition-bg duration-500 hover:bg-right rounded-full px-4 py-3 text-lg w-44"
                >
                  Get Started
                </button>
              </Link>
              <Link href="/dashboard"> 
                <button className="hidden md:block px-4 py-2 border-2 border-gray-800 rounded-full text-lg w-44 hover:bg-gray-200 transition duration-300">
                  Try Free
                </button>
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <div>  </div>
      )}
    </main>
  );
}
