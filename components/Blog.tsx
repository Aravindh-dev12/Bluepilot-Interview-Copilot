"use client";

import React from 'react';

const BlogPage: React.FC = () => {
  const blogs = [
    {
      title: "Introduction to Bluepilot Interview Copilot: Revolutionizing Interview Preparation",
      summary: "Discover how Bluepilot Interview Copilot is transforming the way people prepare for interviews with innovative tools and strategies."
    },
    {
      title: "How Real-Time Audio Transcription: Transforms the Interview Experience",
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
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col items-center p-4">
      <div className="w-full max-w-6xl">
        <section className="text-center mb-16 mt-16">
          <h1 className="text-3xl md:text-4xl font-extrabold text-black mb-3">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4895ef] to-[#c77dff]">
              Discover Our Blog
            </span>
            <span className="text-gray-800 block mt-1">Latest Insights and Innovations</span>
          </h1>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => {
            const [titleMain, titleSubtitle] = blog.title.split(":");
            return (
              <div
                key={index}
                className="p-6 bg-white shadow-md rounded-lg flex flex-col justify-between border border-gray-200 hover:border-gray-300 transition-all duration-300 min-w-[350px] min-h-[350px]" // Adjusted width and height
              >
                <div>
                  <h3 className="text-xl font-bold mb-2 text-black">
                    {titleMain.trim()}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed mt-40">
                    {blog.summary}
                  </p>
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
};

export default BlogPage;
