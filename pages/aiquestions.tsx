import React, { useState } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from 'axios';
import '../app/globals.css';

const QuestionBox: React.FC = () => {
  const [company, setCompany] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [questions, setQuestions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

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

      setQuestions(response.data.choices[0].text.trim().split('\n'));
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
      {/* Hero Section */}
      <section id="hero" className="text-black py-16 w-full">
        <div className="container mx-auto text-center">
        <h2 className="text-4xl md:text-4xl font-bold mb-4 text-gray-800">
        PREPARE FOR YOUR INTERVIEW
        </h2>
        <p className="text-2xl mb-12 bg-gradient-to-r from-[#000000] to-[#000000] bg-clip-text text-transparent">
        Generate role-specific and company-based interview questions <span className="bg-gradient-to-r from-[#4895ef] to-[#c77dff] bg-clip-text text-transparent"> ace your next interview </span></p>
          <button
            onClick={() => setShowModal(true)}
            className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
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

      {/* Questions Display Section */}
      <div className="mt-8 max-w-2xl w-full">
        {questions.length > 0 && (
          <div className="bg-white shadow-md rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">{role} Interview Questions at {company}</h3>
            <ul className="list-disc pl-6">
              {questions.map((question, index) => (
                <li key={index} className="text-gray-700 mb-2">{question}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionBox;
