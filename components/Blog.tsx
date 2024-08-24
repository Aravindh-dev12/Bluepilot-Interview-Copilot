'use client';

import React, { useRef } from 'react';

const ServicePage: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -900, // Adjust this value based on your blog card width
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 900, // Adjust this value based on your blog card width
        behavior: 'smooth',
      });
    }
  };

  // Blog content
  const blogs = [
    {
      title: "Introduction to Bluepilot Interview Copilot: Revolutionizing Interview Preparation",
      summary: "Discover how Bluepilot Interview Copilot is transforming the way people prepare for interviews with innovative tools and strategies."
    },
    {
      title: "How Real-Time Audio Transcription : Transforms the Interview Experience",
      summary: "Learn about the impact of real-time audio transcription on enhancing interview experiences and improving accuracy."
    },
    {
      title: "AI-Powered Response Generation: Crafting Perfect Interview Answers with Technology",
      summary: "Explore how AI-powered technology is used to generate optimal responses for interview questions, enhancing performance."
    },
    {
      title: "AI Skill Development: Mastering the Future of Work",
      summary: "Explore essential skills for AI development and how to prepare for a career in this rapidly evolving field"
    },
    {
      title: "Top AI Interview Questions and How to Prepare for Them",
      summary: "Explore essential skills for AI development and how to prepare for a career in this rapidly evolving field"
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col items-center p-6">
      <div className="w-full max-w-6xl flex flex-col md:flex-row">
        {/* Hero Section */}
        <section className="md:w-1/3 text-center md:text-left mb-8 md:mb-0 flex flex-col justify-center items-center md:items-start">
          <h1 className="text-2xl md:text-4xl font-extrabold text-black mb-4 font-Informal011 BT">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4895ef] to-[#c77dff] backdrop-blur-md">
              EXPLORE OUR BLOG
            </span>
            <span className="text-gray-800 ml-2">
              FOR LATEST INSIGHTS
            </span>
          </h1>

          {/* Scroll Buttons */}
          <div className="flex justify-center items-center mt-4">
            <button
              onClick={scrollLeft}
              className="bg-gray-200 text-black p-4 mx-2 rounded-full shadow-lg"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 5L5 12L12 19" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              onClick={scrollRight}
              className="bg-gray-200 text-black p-4 mx-2 rounded-full shadow-lg"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 19L19 12L12 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </section>

        {/* Blogs Section */}
        <section className="md:w-[59%] flex flex-col items-center mt-40">
          <div className="relative w-full overflow-hidden">
            <div className="overflow-hidden">
              <div
                ref={scrollContainerRef}
                className="flex py-4 space-x-6"
                style={{
                  overflowX: 'scroll', // Enable horizontal scrolling
                  scrollbarWidth: 'none', // Firefox
                  msOverflowStyle: 'none', // Internet Explorer and Edge
                  WebkitOverflowScrolling: 'touch', // For smooth scrolling on iOS
                }}
              >
                {/* Scrollable Blog Cards */}
                {blogs.map((blog, index) => (
                  <div
                    key={index}
                    className="flex-none w-80 p-6 bg-white shadow-lg rounded-lg flex flex-col justify-between"
                    style={{ height: '32rem' }} // Set your desired height here
                  >
                    <div>
                      <h3 className="text-xl font-semibold mb-3">
                        <span className="text-black">
                          {blog.title.split(":")[0]}
                        </span>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4895ef] to-[#c77dff]">
                          {blog.title.split(":")[1]}
                        </span>
                      </h3>
                    </div>
                    <div>
                      <p className="text-gray-600 text-base leading-relaxed">
                        {blog.summary}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ServicePage;
