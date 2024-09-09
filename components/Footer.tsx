import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#383838] text-white py-6 md:py-10 lg:py-14 w-full rounded-t-[20px] md:rounded-t-[50px]">
      <div className="container mx-auto text-center">
        <h1 className="text-6xl sm:text-8xl md:text-12xl lg:text-18xl xl:text-24xl 2xl:text-32xl font-bold leading-tight">
          Bluepilot
        </h1>
        <hr className="my-6 md:my-8 border-white border-opacity-30 w-4/5 md:w-2/3 mx-auto" />
        <div className="flex flex-col md:flex-row justify-between items-center text-xs md:text-sm mt-4 px-4 md:px-8 lg:px-20">
          <span>© 2024 Bluepilot, Inc.</span>
          <div className="text-center md:text-right">
            <a className="link link-hover" href="/tos">Terms of Service</a> | <a className="link link-hover" href="/privacy-policy">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
