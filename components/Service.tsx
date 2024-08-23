"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const ServicePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col items-center p-8">
      <div className="w-full max-w-6xl flex flex-col md:flex-row">
        {/* Hero Section */}
        <section className="md:w-1/2 text-center md:text-left mb-2 md:mb-0 flex flex-col justify-start">
          <h1 className="text-2xl md:text-4xl font-extrabold text-black mb-8 font-Informal011 BT">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4895ef] to-[#c77dff] backdrop-blur-md">
              INNOVATIVE AI
            </span>
            <span className="text-gray-800 ml-2">
              FOR OVERCOMING HIRING CHALLENGES
            </span>
          </h1>
        </section>

        {/* Services Section */}
        <section className="md:w-1/2 grid grid-cols-1 gap-8">
          <ServiceCard
            title="Think ahead"
            description="Advance your career through ongoing skill development and hands-on experience, continuously learning, applying new techniques, and gaining valuable insights"
            icon={<svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C10.3431 2 9 3.34315 9 5C9 6.65685 10.3431 8 12 8C13.6569 8 15 6.65685 15 5C15 3.34315 13.6569 2 12 2Z" fill="black" />
              <path d="M12 9C14.2091 9 16 10.7909 16 13V15H8V13C8 10.7909 9.79086 9 12 9Z" fill="black" />
              <path d="M4 19H20V17H4V19Z" fill="black" />
            </svg>}
          />
          <ServiceCard
            title="Nail the assessment"
            description="Gain confidence with Interview and Coding Copilot® by leveraging real-time transcription and personalized assistance, enhancing your interview and coding skills effectively"
            icon={<svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 1C10.3431 1 9 2.34315 9 4C9 5.65685 10.3431 7 12 7C13.6569 7 15 5.65685 15 4C15 2.34315 13.6569 1 12 1Z" stroke="black" strokeWidth="2" />
              <path d="M4 20C4 17.2388 6.23876 15 9 15H15C17.7612 15 20 17.2388 20 20H4Z" stroke="black" strokeWidth="2" />
              <path d="M17 12H7V16H17V12Z" stroke="black" strokeWidth="2" />
              <path d="M15 17H9V19H15V17Z" stroke="black" strokeWidth="2" />
            </svg>}
          />
          <ServiceCard
            title="Keep close"
            description="Remain engaged through automated follow-ups, review detailed interview summaries, and effectively negotiate your salary for optimal career advancement"
            icon={<svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4C8.68629 4 6 6.68629 6 10C6 13.3137 8.68629 16 12 16C15.3137 16 18 13.3137 18 10C18 6.68629 15.3137 4 12 4Z" stroke="black" strokeWidth="2" fill="none" />
              <path d="M12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6Z" stroke="black" strokeWidth="2" fill="none" />
              <path d="M4 12C2.34315 12 1 13.3431 1 15C1 16.6569 2.34315 18 4 18C5.65685 18 7 16.6569 7 15C7 13.3431 5.65685 12 4 12Z" stroke="black" strokeWidth="2" fill="none" />
              <path d="M20 12C18.3431 12 17 13.3431 17 15C17 16.6569 18.3431 18 20 18C21.6569 18 23 16.6569 23 15C23 13.3431 21.6569 12 20 12Z" stroke="black" strokeWidth="2" fill="none" />
            </svg>}
          />
        </section>
      </div>
    </div>
  );
};

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon }) => {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            controls.start({ opacity: 1, y: 0, transition: { duration: 0.5 } });
          } else {
            setIsVisible(false);
            controls.start({ opacity: 0, y: 50 });
          }
        });
      },
      { threshold: 0.5 }
    );

    const element = ref.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      className="bg-transparent border border-gray-300 p-6 rounded-lg shadow-none flex items-center"
    >
      <div className="mr-4">{icon}</div>
      <div>
        <h2 className="text-xl md:text-2xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
};

export default ServicePage;
