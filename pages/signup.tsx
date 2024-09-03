import React, { useState } from 'react';
import { useRouter } from 'next/router'; // Import useRouter from next/router
import '../app/globals.css';
import axios from 'axios';
import Home from '../components/Home'; // Import Home component

const LoginSignup: React.FC = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false); // New state to handle authentication

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/auth/login", { email, password });
      console.log('Login successful:', response.data);
      // Store token in localStorage or sessionStorage
      localStorage.setItem('token', response.data.token);
      // Set authenticated to true
      setAuthenticated(true);
    } catch (error) {
      setError('Login failed. Please try again.');
      console.error('Login error:', error);
    } finally { 
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/auth/signup", { name, email, password });
      console.log('Signup successful:', response.data);
      // Redirect to login page after successful signup
      setShowLogin(true);
    } catch (error) {
      setError('Signup failed. Please try again.');
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (authenticated) {
    return <Home />; // Render Home component when authenticated
  }

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
        <div className={`absolute top-[-1%] left-0 w-1/2 min-h-[420px] bg-white rounded-3xl shadow-md transform transition-transform duration-500 ${
          showLogin ? 'translate-x-0' : 'translate-x-full'
        }`}
        >
          {showLogin && (
            <div className="p-10">
              <h2 className="text-xl font-medium text-pink-400 mb-12 uppercase tracking-wide">Log In</h2>
              <form onSubmit={handleLogin}>
                <div className="mb-5">
                  <label htmlFor="login-email" className="sr-only">Email</label>
                  <input
                    id="login-email"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border-b border-gray-400 py-2 px-3 text-sm font-light text-gray-700 placeholder-gray-400 focus:border-gray-600 transition duration-200"
                  />
                </div>
                <div className="mb-5">
                  <label htmlFor="login-password" className="sr-only">Password</label>
                  <input
                    id="login-password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border-b border-gray-400 py-2 px-3 text-sm font-light text-gray-700 placeholder-gray-400 focus:border-gray-600 transition duration-200"
                  />
                </div>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="flex justify-between items-center mt-8">
                  <a href="#" className="text-sm text-gray-500 underline hover:text-gray-700 transition duration-200">
                    Forgot your password?
                  </a>
                  <button type="submit" className="bg-pink-400 rounded-3xl py-2 px-8 text-white uppercase tracking-wide transition hover:bg-pink-500" disabled={loading}>
                    {loading ? 'Loading...' : 'Log In'}
                  </button>
                </div>
              </form>
            </div>
          )}
          {!showLogin && (
            <div className="p-12">
              <h2 className="text-xl font-medium text-pink-400 mb-12 uppercase tracking-wide">Sign Up</h2>
              <form onSubmit={handleSignup}>
                <div className="mb-5">
                  <label htmlFor="signup-name" className="sr-only">Full Name</label>
                  <input
                    id="signup-name"
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border-b border-gray-400 py-2 px-3 text-sm font-light text-gray-700 placeholder-gray-400 focus:border-gray-600 transition duration-200"
                  />
                </div>
                <div className="mb-5">
                  <label htmlFor="signup-email" className="sr-only">Email</label>
                  <input
                    id="signup-email"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border-b border-gray-400 py-2 px-3 text-sm font-light text-gray-700 placeholder-gray-400 focus:border-gray-600 transition duration-200"
                  />
                </div>
                <div className="mb-5">
                  <label htmlFor="signup-password" className="sr-only">Password</label>
                  <input
                    id="signup-password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border-b border-gray-400 py-2 px-3 text-sm font-light text-gray-700 placeholder-gray-400 focus:border-gray-600 transition duration-200"
                  />
                </div>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="flex justify-end mt-8">
                  <button type="submit" className="bg-pink-400 rounded-3xl py-2 px-8 text-white uppercase tracking-wide transition hover:bg-pink-500" disabled={loading}>
                    {loading ? 'Loading...' : 'Sign Up'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LoginSignup;
