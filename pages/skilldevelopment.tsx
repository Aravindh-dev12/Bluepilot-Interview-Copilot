import React, { useState } from 'react';
import { useRouter } from 'next/router';
import '../app/globals.css';

const skilldevelopment: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [tutorial, setTutorial] = useState<string | null>(null);
  const [examples, setExamples] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (input.trim() === '') {
      alert('Please enter a skill or career goal.');
      return;
    }

    setLoading(true);

    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    const prompts = {
      tutorial: `Create a detailed tutorial on ${input} covering fundamental concepts, including explanations, syntax, and examples.`,
      examples: `Generate a list of example scenarios related to ${input} with explanations. Include common tasks and their implementations.`
    };

    try {
      const responses = await Promise.all(
        Object.keys(prompts).map(async (key) => {
          const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: 'text-davinci-003',
              prompt: prompts[key as keyof typeof prompts],
              max_tokens: 1000,
              temperature: 0.7,
            }),
          });

          if (!response.ok) {
            throw new Error(`Network response was not ok for ${key}`);
          }

          const data = await response.json();
          return data.choices[0]?.text?.trim() || 'No content available.';
        })
      );

      setTutorial(responses[0]);
      setExamples(responses[1]);
    } catch (error) {
      console.error('Error fetching content:', error);
      alert('An error occurred while generating content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-gray-900">
      <section className="py-16 mt-[-20px]">
        <div className="container mx-auto text-start px-4">
          <h2 className="text-2xl md:text-2xl font-semibold mb-2 text-gray-800">Analyze Your Skills</h2>
          <p className="text-lg mb-12 bg-gradient-to-r from-[#000000] to-[#000000] bg-clip-text text-transparent">
          Submit your career goals to receive personalized tutorials and examples. This tool helps enhance your skills with with detailed content tailored to your professional development needs </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="border-2 border-black bg-gray-100 text-black px-4 py-2 text-lg w-44 rounded-full hover:bg-gray-100 mb-10"
          >
            Enter Skill
          </button>
        </div>
      </section>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 w-full max-w-3xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-0 right-2 text-gray-600 hover:text-gray-900 text-3xl"
            >
              &times;
            </button>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Skill or Career Goal</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <label className="block mb-6">
                <textarea
                  className="form-textarea mt-3 block w-full rounded-xl shadow-sm focus:ring focus:ring-opacity-50 transition-all duration-300 p-3"
                  rows={5}
                  placeholder="e.g., 'I want to improve my data science skills'"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                ></textarea>
              </label>
              <div className="flex justify-center mt-8">
                <button
                  type="submit"
                  className="border-2 border-black bg-gray-100 text-black px-4 py-2 text-lg w-44 rounded-full hover:bg-gray-100"
                  disabled={loading}
                >
                  {loading ? 'Generating Content...' : 'Analyze'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {tutorial && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="bg-white shadow-lg rounded-lg p-8 mx-auto max-w-3xl border border-gray-200">
              <h3 className="text-2xl font-semibold mb-4">Tutorial:</h3>
              <p>{tutorial}</p>
            </div>
          </div>
        </section>
      )}

      {examples && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="bg-white shadow-lg rounded-lg p-8 mx-auto max-w-3xl border border-gray-200">
              <h3 className="text-2xl font-semibold mb-4">Examples:</h3>
              <p>{examples}</p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default skilldevelopment;