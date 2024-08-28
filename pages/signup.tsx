import React, { useState } from 'react';
import '../app/globals.css';

const LoginSignup: React.FC = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <section className="flex justify-center items-center w-full h-screen bg-gray-300">
      <div className="relative w-4/5">
        <div className="flex justify-between bg-gray-800 rounded-3xl">
          <div className="w-1/2 p-16 text-white font-light">
            <h2 className="text-2xl mb-4">Welcome Back</h2>
            <p className="text-sm mb-8">Already have an account? Sign in to access your profile and manage your account settings.</p>
            <button
              onClick={() => setShowLogin(true)}
              className="bg-transparent border border-gray-400 rounded-3xl py-2 px-8 text-white uppercase tracking-wider transition hover:bg-gray-400 hover:text-gray-800"
            >
              Sign In
            </button>
          </div>
          <div className="w-1/2 p-16 text-white font-light">
            <h2 className="text-2xl mb-4">New Here?</h2>
            <p className="text-sm mb-8">Join us today to start exploring and accessing your personalized content. It's quick and easy!</p>
            <button
              onClick={() => setShowLogin(false)}
              className="bg-transparent border border-gray-400 rounded-3xl py-2 px-8 text-white uppercase tracking-wider transition hover:bg-gray-400 hover:text-gray-800"
            >
              Sign Up
            </button>
          </div>
        </div>
        <div className={`absolute top-[-1 %] left-0 w-1/2 min-h-[420px] bg-white rounded-3xl shadow-md transform transition-transform duration-500 ${
    showLogin ? 'translate-x-0' : 'translate-x-full'
  }`}
>
          {showLogin && (
            <div className="p-10">
              <h2 className="text-xl font-medium text-pink-400 mb-12 uppercase tracking-wide">Log In</h2>
              <div className="mb-5">
                <input
                  type="text"
                  placeholder="Email"
                  className="w-full border-b border-gray-400 py-2 px-3 text-sm font-light text-gray-700 placeholder-gray-400 focus:border-gray-600 transition duration-200"
                />
              </div>
              <div className="mb-5">
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full border-b border-gray-400 py-2 px-3 text-sm font-light text-gray-700 placeholder-gray-400 focus:border-gray-600 transition duration-200"
                />
              </div>
              <div className="flex justify-between items-center mt-8">
                <a href="#" className="text-sm text-gray-500 underline hover:text-gray-700 transition duration-200">
                  Forgot your password?
                </a>
                <button className="bg-pink-400 rounded-3xl py-2 px-8 text-white uppercase tracking-wide transition hover:bg-pink-500">
                  Log In
                </button>
              </div>
            </div>
          )}
          {!showLogin && (
            <div className="p-12">
              <h2 className="text-xl font-medium text-pink-400 mb-12 uppercase tracking-wide">Sign Up</h2>
              <div className="mb-5">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full border-b border-gray-400 py-2 px-3 text-sm font-light text-gray-700 placeholder-gray-400 focus:border-gray-600 transition duration-200"
                />
              </div>
              <div className="mb-5">
                <input
                  type="text"
                  placeholder="Email"
                  className="w-full border-b border-gray-400 py-2 px-3 text-sm font-light text-gray-700 placeholder-gray-400 focus:border-gray-600 transition duration-200"
                />
              </div>
              <div className="mb-5">
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full border-b border-gray-400 py-2 px-3 text-sm font-light text-gray-700 placeholder-gray-400 focus:border-gray-600 transition duration-200"
                />
              </div>
              <div className="flex justify-end mt-8">
                <button className="bg-pink-400 rounded-3xl py-2 px-8 text-white uppercase tracking-wide transition hover:bg-pink-500">
                  Sign Up
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LoginSignup;
