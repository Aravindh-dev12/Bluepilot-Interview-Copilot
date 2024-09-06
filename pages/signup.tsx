import React, { useState } from 'react';
import axios from 'axios';
import '../app/globals.css';
import Home from '../components/Home'; // Import Home component

const LoginSignup: React.FC = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/auth/login", { email, password });
      console.log('Login successful:', response.data);
      // Securely handle tokens and authentication
      localStorage.setItem('token', response.data.token);
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
      setShowLogin(true);
    } catch (error) {
      setError('Signup failed. Please try again.');
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (authenticated) {
    return <Home />;
  }

  return (
    <section className="relative w-full h-screen flex">
      <div className="w-1/2 h-full bg-cover bg-center" style={{ backgroundImage: 'url(/path-to-your-image.jpg)' }}>
      </div>
      <div className="w-1/2 h-full flex flex-col items-center justify-center p-8">
        {showLogin ? (
          <div className="w-full max-w-md">
            <h2 className="text-xl bg-clip-text text-transparent bg-gradient-to-r from-[#4895ef] to-[#c77dff] mb-12 uppercase tracking-wide">
              Sign in to Final Round AI
            </h2>
            <h3>Welcome back! Please sign in to continue</h3>
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label htmlFor="login-email" className="sr-only">Email</label>
                <input
                  id="login-email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-b border-gray-400 py-2 px-3 text-sm font-light text-gray-700 placeholder-gray-400 focus:border-gray-600 transition duration-200"
                />
              </div>
              <div>
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
              {error && <p className="text-red-500 mb-4" aria-live="polite">{error}</p>}
              <div className="mt-2">
                <a href="#" className="text-sm text-gray-500 underline hover:text-gray-700 transition duration-200">
                  Forgot your password?
                </a>
              </div>
              <div className="flex justify-center mt-4">
                <button type="submit" className="border-2 border-black bg-gray-100 text-black px-4 py-2 text-lg rounded-full hover:bg-gray-100 w-full max-w-xs mx-auto" disabled={loading}>
                  {loading ? 'Loading...' : 'Log In'}
                </button>
              </div>
            </form>
            <div className="mt-8 flex items-center w-full max-w-md space-x-2">
              <span>Don’t have an account?</span>
              <button
                onClick={() => setShowLogin(false)}
                className="rounded-3xl py-2 px-2 text-black"
              >
                Sign Up
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-md">
            <div className="mt-2">
              <h2 className="text-xl bg-clip-text text-transparent bg-gradient-to-r from-[#4895ef] to-[#c77dff] mb-2 uppercase tracking-wide">
                Create your account
              </h2>
              <h3>Welcome! Please fill in the details to get started</h3>
            </div>
            <form onSubmit={handleSignup} className="space-y-5">
              <div>
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
              <div>
                <label htmlFor="signup-email" className="sr-only">Email</label>
                <input
                  id="signup-email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-b border-gray-400 py-2 px-3 text-sm font-light text-gray-700 placeholder-gray-400 focus:border-gray-600 transition duration-200"
                />
              </div>
              <div>
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
              {error && <p className="text-red-500 mb-4" aria-live="polite">{error}</p>}
              <div className="flex justify-center mt-8">
                <button type="submit" className="border-2 border-black bg-gray-100 text-black px-4 py-2 text-lg rounded-full hover:bg-gray-100 w-full max-w-xs mx-auto" disabled={loading}>
                  {loading ? 'Loading...' : 'Sign Up'}
                </button>
              </div>
            </form>
            <div className="mt-10 flex items-center w-full max-w-md space-x-2">
              <span>Already have an account?</span>
              <button
                onClick={() => setShowLogin(true)}
                className="rounded-3xl py-2 px-2 text-black"
              >
                Sign In
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LoginSignup;
