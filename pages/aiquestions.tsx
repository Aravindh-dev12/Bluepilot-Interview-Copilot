// src/components/QuestionBox.tsx
import React, { useState } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from 'axios';
import { useRouter } from 'next/router';
import '../app/globals.css';

const QuestionBox: React.FC = () => {
  const [company, setCompany] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const router = useRouter();

  const handleGenerateQuestions = async () => {
    if (!company || !role) {
      setError('Please enter both a company name and a role');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('https://api.openai.com/v1/completions', {
        model: "text-davinci-003",
        prompt: `Generate relevant interview questions for a ${role} position at ${company}. Include both general and role-specific questions.`,
        max_tokens: 300,
      }, {
        headers: {
          'Authorization': `Bearer YOUR_API_KEY`,
        },
      });

      const questions = response.data.choices[0].text.trim().split('\n');
      router.push({
        pathname: '/questions',
        query: { questions: JSON.stringify(questions), company, role },
      });
    } catch (err: any) {
      console.error('API call error:', err);
      setError('Failed to generate questions. Please try again.');
    } finally {
      setLoading(false);
      setShowModal(false); // Close the modal after generating questions
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Header />
      <section id="hero" className="text-black py-16 w-full">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-4xl font-bold mb-4 text-gray-800">
            PREPARE FOR YOUR INTERVIEW
          </h2>
          <p className="text-2xl mb-12 bg-gradient-to-r from-[#000000] to-[#000000] bg-clip-text text-transparent">
            Generate role-specific and company-based interview questions <span className="bg-gradient-to-r from-[#4895ef] to-[#c77dff] bg-clip-text text-transparent"> ace your next interview </span>
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-btn-grad text-white bg-[length:200%] bg-left transition-bg duration-500 hover:bg-right rounded-full px-4 py-6 text-lg w-64"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Modal Section */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 text-center">Enter Details</h3>
            <input
              type="text"
              placeholder="Enter company name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500"
            />
            <input
              type="text"
              placeholder="Enter role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-md text-gray-800 mt-4 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500"
            />
            <div className="flex justify-between mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerateQuestions}
                disabled={loading}
                className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Generating...' : 'Generate'}
              </button>
            </div>
            {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
          </div>
        </div>
      )}

      <div className="container mx-auto mt-20 py-4 max-w-4xl px-4">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">
          High-Priority Interview Questions
        </h2>
        <div className="bg-white shadow-md rounded-lg p-4 mb-16"> {/* Add margin-bottom here */}
          <section className="mb-6 border border-gray-300 rounded-lg p-4">
            <div className="grid grid-cols-[1fr_auto] gap-x-2 mb-2">
              <h2 className="text-xl font-semibold bg-gradient-to-r from-[#4895ef] to-[#c77dff] bg-clip-text text-transparent">Google</h2>
              <h2 className="text-lg font-semibold text-gray-700 text-right">Software Developer</h2>
            </div>
            <h3 className="text-md font-semibold mb-1">Array and Strings</h3>
            <p className="text-gray-700 text-sm">
              <strong>Question:</strong> Given an array of integers, find the contiguous subarray with the maximum sum. Write a function to solve this problem.
            </p>
          </section>

          <section className="mb-6 border border-gray-300 rounded-lg p-4">
            <div className="grid grid-cols-[1fr_auto] gap-x-2 mb-2">
              <h2 className="text-xl font-semibold bg-gradient-to-r from-[#4895ef] to-[#c77dff] bg-clip-text text-transparent">Zoho</h2>
              <h2 className="text-lg font-semibold text-gray-700 text-right">Quality Analyst</h2>
            </div>
            <h3 className="text-md font-semibold mb-1">SQL and Database Testing</h3>
            <p className="text-gray-700 text-sm">
              <strong>Question:</strong> Write a SQL query to find the top 5 highest-paid employees from an employee database.
            </p>
          </section>

          <section className="mb-6 border border-gray-300 rounded-lg p-4">
            <div className="grid grid-cols-[1fr_auto] gap-x-2 mb-2">
              <h2 className="text-xl font-semibold bg-gradient-to-r from-[#4895ef] to-[#c77dff] bg-clip-text text-transparent">HCL</h2>
              <h2 className="text-lg font-semibold text-gray-700 text-right">International Payroll Specialist</h2>
            </div>
            <h3 className="text-md font-semibold mb-1">Time Management</h3>
            <p className="text-gray-700 text-sm">
              <strong>Question:</strong> How do you prioritize tasks and manage deadlines when dealing with multiple payroll cycles and compliance requirements?
            </p>
          </section>

          <section className="mb-6 border border-gray-300 rounded-lg p-4">
            <div className="grid grid-cols-[1fr_auto] gap-x-2 mb-2">
              <h2 className="text-xl font-semibold bg-gradient-to-r from-[#4895ef] to-[#c77dff] bg-clip-text text-transparent">Amazon</h2>
              <h2 className="text-lg font-semibold text-gray-700 text-right">Account Manager</h2>
            </div>
            <h3 className="text-md font-semibold mb-1">Client Negotiations</h3>
            <p className="text-gray-700 text-sm">
              <strong>Question:</strong> Describe a time when you had to negotiate terms or resolve conflicts with a client. What was your approach, and what was the outcome?
            </p>
          </section>

          <section className="mb-6 border border-gray-300 rounded-lg p-4">
            <div className="grid grid-cols-[1fr_auto] gap-x-2 mb-2">
              <h2 className="text-xl font-semibold bg-gradient-to-r from-[#4895ef] to-[#c77dff] bg-clip-text text-transparent">EY</h2>
              <h2 className="text-lg font-semibold text-gray-700 text-right">SAP Datascientist</h2>
            </div>
            <h3 className="text-md font-semibold mb-1">Data Science Skills</h3>
            <p className="text-gray-700 text-sm">
              <strong>Question:</strong> How would you handle missing data in a dataset? What methods would you use to impute or manage missing values?
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default QuestionBox;
