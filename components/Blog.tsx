"use client";

import React from 'react';

const BlogPage: React.FC = () => {
  const blogs = [
    {
      title: "Introduction to Bluepilot Interview Copilot: Revolutionizing Interview Preparation",
      summary: "Discover how Bluepilot Interview Copilot is transforming the way people prepare for interviews with innovative tools and strategies."
    },
    {
      title: "How Real-Time Audio Transcription Transforms the Interview Experience",
      summary: "Learn about the impact of real-time audio transcription on enhancing interview experiences and improving accuracy."
    },
    {
      title: "AI-Powered Response Generation: Crafting Perfect Interview Answers with Technology",
      summary: "Explore how AI-powered technology is used to generate optimal responses for interview questions, enhancing performance."
    },
    {
      title: "AI Skill Development: Mastering the Future of Work",
      summary: "Explore essential skills for AI development and how to prepare for a career in this rapidly evolving field."
    },
    {
      title: "Tailoring Your Resume with AI: Stand Out in Job Applications",
      summary: "Learn how to use AI tools to customize your resume and cover letter, making them more attractive to potential employers."
    },
    {
      title: "AI-Driven Job Matching: Finding the Perfect Role with Technology",
      summary: "Discover how AI algorithms can match your skills and experiences with the right job opportunities, enhancing your job search efficiency."
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col items-center p-6">
      <div className="w-full max-w-7xl">
        <section className="text-center mb-20 mt-20">  {/* Increased margin at the top */}
          <h1 className="text-4xl md:text-4xl font-extrabold text-black mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4895ef] to-[#c77dff]">
              Discover Our Blog
            </span>
            <span className="text-gray-800 block mt-2">Latest Insights and Innovations</span>
          </h1>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className={`p-6 bg-white shadow-lg rounded-lg flex flex-col justify-between transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl ${index % 2 === 0 ? 'translate-y-2' : '-translate-y-2'}`}
              style={{ height: '22rem' }}
            >
              <div>
                <h3 className="text-2xl font-semibold mb-3 text-black">
                  {blog.title.split(":")[0]}
                </h3>
                <h4 className="text-xl font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-[#4895ef] to-[#c77dff]">
                  {blog.title.split(":")[1]}
                </h4>
                <p className="text-gray-600 text-md leading-relaxed">
                  {blog.summary}
                </p>
              </div>
              <div className="mt-4">
                <a href="#" className="text-[#4895ef] font-bold text-md">
                  Read More →
                </a>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default BlogPage;
