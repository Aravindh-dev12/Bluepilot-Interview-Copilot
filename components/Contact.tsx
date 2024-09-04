import React from 'react';

const SubscriptionForm: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl md:text-5xl font-extrabold text-black mb-4 font-Informal011 BT text-center">
        <span className="text-gray-800">
          Get updates, promotions, and 
        </span>
        <br />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4895ef] to-[#c77dff] backdrop-blur-md">
          key announcements via email
        </span>
      </h1>
      <div className="flex flex-row items-center mt-4 space-x-4">
        <input
          type="email"
          placeholder="Write your email*"
          style={{ width: '400px' }} // Adjust the width as needed
          className="border border-gray-300 rounded-full px-4 py-2 focus:outline-none"
        />
        <button className="bg-btn-grad text-white bg-[length:200%] bg-left transition-bg duration-500 hover:bg-right rounded-full px-4 py-3 text-lg w-38">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default SubscriptionForm;
