import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link'; // Import Link
import { useRouter } from 'next/router'; // Import useRouter for navigation
import '../app/globals.css';
import Home from '../components/Home';

const LoginSignup: React.FC = () => {
  const router = useRouter(); // Initialize router for navigation
  const [showLogin, setShowLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/auth/login", { email, password });
      console.log('Login successful:', response.data);
      localStorage.setItem('token', response.data.token);
      setAuthenticated(true);
      router.push('/dashboard'); // Redirect to the dashboard page after successful login
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

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    const { movementX, movementY } = e;
    setImagePosition((prevPosition) => ({
      x: prevPosition.x + movementX,
      y: prevPosition.y + movementY,
    }));
  };

  if (authenticated) {
    return <Home />;
  }

  return (
    <section className="relative w-full h-screen flex">
      {/* Left edge header link */}
      <div className="absolute top-4 left-3 p-4">
        <Link href="/" className="text-3xl font-semibold">
          BluePilot
        </Link>
      </div>

      {/* Image container for login/signup */}
      <div className="relative w-1/2 h-full overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            clipPath: 'circle(40% at center)', // Circular crop
          }}
        >
          <div
            className="relative w-full h-full"
            style={{
              backgroundImage: showLogin
                ? 'url(/signinterview.jpg)' // Image for sign-in form
                : 'url(/logininterview.jpg)', // Image for sign-up form
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              left: showLogin ? `${imagePosition.x + 50}px` : `${imagePosition.x - 40}px`, // Adjusted for offset
              top: `${imagePosition.y}px`,
            }}
            draggable="true"
            onDrag={handleDrag}
          ></div>
        </div>
        <div className="relative z-10 flex items-center justify-center h-full">
          {/* Content goes here */}
        </div>
      </div>

      <div className="w-1/2 h-full flex flex-col items-center justify-center p-8">
        {showLogin ? (
          <div className="w-full max-w-md flex flex-col items-center">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#4895ef] to-[#c77dff] uppercase tracking-wide">
                Sign in to Bluepilot
              </h2>
              <h3>Welcome back! Please sign in to continue</h3>
            </div>
            <form onSubmit={handleLogin} className="space-y-5 w-full">
              <div>
                <label htmlFor="login-email" className="sr-only">Email</label>
                <input
                  id="login-email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-b border-gray-400 py-2 px-3 text-lg font-light text-gray-700 placeholder-gray-800 focus:border-gray-600 transition duration-200"
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
                  className="w-full border-b border-gray-400 py-2 px-3 text-lg font-light text-gray-700 placeholder-gray-800 focus:border-gray-600 transition duration-200"
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
            <div className="mt-8 flex items-center space-x-2">
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
          <div className="w-full max-w-md flex flex-col items-center">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#4895ef] to-[#c77dff] mb-2 uppercase tracking-wide">
                Create your account
              </h2>
              <h3>Welcome! Please fill in the details to get started</h3>
            </div>
            <form onSubmit={handleSignup} className="space-y-5 w-full">
              <div>
                <label htmlFor="signup-name" className="sr-only">Full Name</label>
                <input
                  id="signup-name"
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border-b border-gray-400 py-2 px-3 text-lg font-light text-gray-700 placeholder-gray-800 focus:border-gray-600 transition duration-200"
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
                  className="w-full border-b border-gray-400 py-2 px-3 text-lg font-light text-gray-700 placeholder-gray-800 focus:border-gray-600 transition duration-200"
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
                  className="w-full border-b border-gray-400 py-2 px-3 text-lg font-light text-gray-700 placeholder-gray-800 focus:border-gray-600 transition duration-200"
                />
              </div>
              {error && <p className="text-red-500 mb-4" aria-live="polite">{error}</p>}
              <div className="flex justify-center mt-8">
                <button type="submit" className="border-2 border-black bg-gray-100 text-black px-4 py-2 text-lg rounded-full hover:bg-gray-100 w-full max-w-xs mx-auto" disabled={loading}>
                  {loading ? 'Loading...' : 'Sign Up'}
                </button>
              </div>
            </form>
            <div className="mt-8 flex items-center space-x-2">
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
