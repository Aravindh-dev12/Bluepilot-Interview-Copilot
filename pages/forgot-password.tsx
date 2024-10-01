import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import '../app/globals.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/forgot-password`, { email });
      setMessage('Password reset link sent to your email.');
    } catch (error) {
      setError('Failed to send reset link. Please try again.');
      console.error('Forgot password error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-md flex flex-col items-center">
        <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#4895ef] to-[#c77dff] uppercase tracking-wide">
          Forgot Password
        </h2>
        <p className="text-center">Enter your email to receive a password reset link.</p>
        <form onSubmit={handleSubmit} className="space-y-5 w-full">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#4895ef] focus:border-[#4895ef] sm:text-sm"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {message && <p className="text-green-500 text-sm">{message}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#4895ef] to-[#c77dff] hover:from-[#c77dff] hover:to-[#4895ef] focus:outline-none"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        <p className="mt-4 text-sm">
          Remembered your password?{' '}
          <Link href="/login" className="text-[#4895ef] hover:text-[#c77dff]">Log In</Link>
        </p>
      </div>
    </section>
  );
};

export default ForgotPassword;
