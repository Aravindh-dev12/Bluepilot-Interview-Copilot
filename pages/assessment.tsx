import React, { useState } from 'react';
import '../app/globals.css';

const SkillAssessmentPage: React.FC = () => {
  const [input, setInput] = useState('');
  const [content, setContent] = useState<{ tutorial: string | null; examples: string | null } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if the input is empty
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

      setContent({
        tutorial: responses[0],
        examples: responses[1]
      });
    } catch (error) {
      console.error('Error fetching content:', error);
      setContent({
        tutorial: 'An error occurred while fetching the tutorial.',
        examples: 'An error occurred while fetching the examples.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <section className=" py-16">
        <div className="container mx-auto text-center px-4">
        <h2 className="text-4xl md:text-4xl font-bold mb-4 text-gray-800">
         AI-POWERED SKILL ASSESSMENT
        </h2>
        <p className="text-2xl mb-12 bg-gradient-to-r from-[#000000] to-[#000000] bg-clip-text text-transparent">
        Receive detailed tutorials and practical examples to advance <span className="bg-gradient-to-r from-[#4895ef] to-[#c77dff] bg-clip-text text-transparent"> your skills and career goals </span></p>
        </div>
      </section>
      <section id="assessment" className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-white shadow-lg rounded-lg p-8 mx-auto max-w-3xl border border-gray-200">
            <form onSubmit={handleSubmit}>
              <label className="block mb-6">
                <span className="text-gray-700 text-lg font-semibold">Enter your skills or career goals:</span>
                <textarea
                  className="form-textarea mt-2 block w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  rows={4}
                  placeholder="e.g., 'I want to improve my data science skills'"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                ></textarea>
              </label>
              <button
                type="submit"
                className="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
                disabled={loading}
              >
                {loading ? 'Generating Content...' : 'Analyze'}
              </button>
            </form>
            {content && (
              <div className="mt-12 space-y-8">
                <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-md">
                  <h3 className="text-2xl font-semibold mb-4">Tutorial:</h3>
                  <p>{content.tutorial}</p>
                </div>
                <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-md">
                  <h3 className="text-2xl font-semibold mb-4">Examples:</h3>
                  <p>{content.examples}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SkillAssessmentPage;
