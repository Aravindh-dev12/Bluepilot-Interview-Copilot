import React, { useState } from 'react';
import axios from 'axios';
import '../app/globals.css';

const QuestionBox: React.FC = () => {
  const [company, setCompany] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [category, setCategory] = useState<string>('product design');
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState<[string, string][]>([]);
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
        prompt: `Generate relevant interview questions and answers for a ${role} position at ${company} focusing on ${category}. Include both general and role-specific questions.`,
        max_tokens: 600,
      }, {
        headers: {
          'Authorization': `Bearer YOUR_API_KEY`,
        },
      });

      const data: string[] = response.data.choices[0].text.trim().split('\n');
      const questionsAndAnswers: [string, string][] = data.map((item: string) => {
        const [question, answer] = item.split('Answer:');
        return [question.trim(), answer ? answer.trim() : ''];
      });

      setQuestionsAndAnswers(questionsAndAnswers);
    } catch (err: any) {
      console.error('API call error:', err);
      setError('Failed to generate questions. Please try again.');
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };

  return (
    <div className="min-h-screen text-gray-900">
      <section id="hero" className="text-black py-16 w-full">
        <div className="container mx-auto text-start">
          <h2 className="text-2xl md:text-2xl font-semibold mb-8 text-gray-800">
            Prepare For Your Interview
          </h2>
          <p className="text-lg mb-12 bg-gradient-to-r from-[#000000] to-[#000000] bg-clip-text text-transparent">
            Generate customized interview questions based on the company and role you're targeting. Prepare thoroughly for your next job interview with relevant and insightful questions tailored to your needs.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="border-2 border-black bg-gray-100 text-black px-4 py-2 text-lg w-44 rounded-full hover:bg-gray-100"
          >
            Generate 
          </button>
        </div>
      </section>

      {/* Modal Section */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
            {/* Cancel Icon */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            
            <h3 className="text-xl font-semibold mb-4 text-gray-800 text-center">Enter Details</h3>
            <input
              type="text"
              placeholder="Enter company name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-black-800 placeholder-gray-500"
            />
            <input
              type="text"
              placeholder="Enter role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-md text-gray-800 mt-4 focus:outline-none focus:ring-2 focus:ring-black-800 placeholder-gray-500"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-md text-gray-800 mt-4 focus:outline-none focus:ring-2 focus:ring-black-800"
            >
              <option value="product design">Product Design</option>
              <option value="product strategy">Product Strategy</option>
              <option value="behavioral">Behavioral</option>
              <option value="coding">Coding</option>
              <option value="execution">Execution</option>
              <option value="technical">Technical</option>
              <option value="analytical">Analytical</option>
              <option value="data structures">Data Structures</option>
            </select>
            <div className="flex justify-center mt-6">
              <button
                onClick={handleGenerateQuestions}
                disabled={loading}
                className={`border-2 border-black bg-gray-100 text-black px-4 py-2 text-lg w-44 rounded-full hover:bg-gray-100 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Generating...' : 'Create'}
              </button>
            </div>
            {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
          </div>
        </div>
      )}

      {/* Display Questions and Answers */}
      {questionsAndAnswers.length > 0 && (
        <div className="container mx-auto mt-20 py-4 max-w-4xl px-4">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">
            Interview Questions and Answers
          </h2>
          <div className="bg-white shadow-md rounded-lg p-4">
            <ul className="list-disc pl-6">
              {questionsAndAnswers.map(([question, answer], index) => (
                <li key={index} className="mb-4">
                  <div className="font-semibold text-gray-800 mb-1">{question}</div>
                  <div className="text-gray-700">{answer}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionBox;
