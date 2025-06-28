import React from 'react';
import { FaLinkedin, FaYoutube } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#383838] text-white py-6 md:py-10 lg:py-14 w-full rounded-t-[20px] md:rounded-t-[50px]">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold leading-none">
          BluePilot
        </h1>
        <hr className="my-6 md:my-8 border-white border-opacity-30 w-4/5 md:w-2/3 mx-auto" />
        <div className="flex flex-col md:flex-row justify-between items-center text-xs md:text-sm mt-4 px-4 md:px-8 lg:px-20">
          <span>© 2024 BluePilot, Inc.</span>
          <div className="flex gap-4 md:gap-6 mt-4 md:mt-0">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 text-base md:text-xl lg:text-2xl"
            >
              <FaLinkedin className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" /> {/* Adjusted icon size */}
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 text-2xl md:text-3xl lg:text-4xl"
            >
              𝕏 {/* Unicode for X icon */}
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-600 text-base md:text-xl lg:text-2xl"
            >
              <FaYoutube className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" /> {/* Adjusted icon size */}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
