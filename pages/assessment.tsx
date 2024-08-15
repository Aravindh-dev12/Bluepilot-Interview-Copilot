import React, { useState } from 'react';
import '../app/globals.css';

const SkillAssessmentPage: React.FC = () => {
  const [input, setInput] = useState('');
  const [content, setContent] = useState<{ tutorial: string | null; exercises: string | null; examples: string | null; quiz: string | null } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) {
      setError('Please enter a skill or career goal.');
      return;
    }

    setError(null);
    setLoading(true);

    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    const prompts = {
      tutorial: `Create a detailed tutorial on ${input} covering fundamental concepts, including explanations, syntax, and examples.`,
      exercises: `Provide a series of practical exercises for learning ${input}. Include tasks with solutions and explanations.`,
      examples: `Generate a list of example scenarios related to ${input} with explanations. Include common tasks and their implementations.`,
      quiz: `Create a quiz with questions about ${input}. Include multiple-choice questions with correct answers and explanations.`
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
        exercises: responses[1],
        examples: responses[2],
        quiz: responses[3]
      });
    } catch (error) {
      console.error('Error fetching content:', error);
      setError('An error occurred while fetching the content.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <section id="assessment" className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">AI-Powered Skill Assessment</h2>
          <div className="bg-white shadow-lg rounded-lg p-8 mx-auto max-w-md">
            <form onSubmit={handleSubmit}>
              <label className="block text-left mb-4">
                <span className="text-gray-700">Enter your skills or career goals:</span>
                <textarea
                  className="form-textarea mt-1 block w-full border-gray-300 rounded-lg"
                  rows={4}
                  placeholder="e.g., 'I want to improve my data science skills'"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                ></textarea>
              </label>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? 'Generating Content...' : 'Analyze'}
              </button>
            </form>
            {content && (
              <div className="mt-8">
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg mb-4">
                  <h3 className="text-xl font-semibold mb-4">Tutorial:</h3>
                  <p>{content.tutorial}</p>
                </div>
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg mb-4">
                  <h3 className="text-xl font-semibold mb-4">Exercises:</h3>
                  <p>{content.exercises}</p>
                </div>
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg mb-4">
                  <h3 className="text-xl font-semibold mb-4">Examples:</h3>
                  <p>{content.examples}</p>
                </div>
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Quiz:</h3>
                  <p>{content.quiz}</p>
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
