import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Header from "../components/Header";
import '../app/globals.css';

const ResultsPage: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [tutorial, setTutorial] = useState<string | null>(null);
  const [examples, setExamples] = useState<string | null>(null);
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
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Header />
      <section className="py-16">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-4xl md:text-4xl font-bold mb-4 text-gray-800">Analyze Your Skills</h2>
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-200">
            <label className="block mb-6">
              <textarea
                className="form-textarea mt-3 block w-full rounded-xl shadow-sm  focus:ring  focus:ring-opacity-50 transition-all duration-300 p-3"
                rows={5}
                placeholder="e.g., 'I want to improve my data science skills'"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              ></textarea>
            </label>
            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="bg-btn-grad text-black px-2 py-2 text-lg w-44 rounded-full bg-[length:200%] bg-left transition-bg duration-500 hover:bg-right rounded-full"
                disabled={loading}
              >
                {loading ? 'Generating Content...' : 'Analyze'}
              </button>
            </div>
          </form>
        </div>
      </section>

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

export default ResultsPage;
