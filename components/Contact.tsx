import React from 'react';

const SubscriptionForm: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col items-center justify-center p-4 md:p-8">
      <h1 className="text-xl md:text-3xl lg:text-5xl font-extrabold text-black mb-4 font-Informal011 BT text-center">
        <span className="text-gray-800">
          Get updates, promotions, and 
        </span>
        <br />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4895ef] to-[#c77dff] backdrop-blur-md">
          key announcements via email
        </span>
      </h1>
      <div className="flex flex-col sm:flex-row items-center mt-4 space-y-4 sm:space-y-0 sm:space-x-4">
        <input
          type="email"
          placeholder="Write your email*"
          className="border border-gray-300 rounded-full px-4 py-2 focus:outline-none w-full sm:w-[300px] md:w-[400px]"
        />
        <button className="bg-btn-grad text-black bg-[length:200%] bg-left transition-bg duration-500 hover:bg-right rounded-full px-4 py-3 text-lg w-full sm:w-auto">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default SubscriptionForm;
