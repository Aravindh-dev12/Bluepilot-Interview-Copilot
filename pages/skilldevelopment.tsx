import React, { useState } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from 'next/router';
import '../app/globals.css';

const SkillAssessmentPage: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
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

      // Encode content for URL
      const encodedTutorial = encodeURIComponent(responses[0]);
      const encodedExamples = encodeURIComponent(responses[1]);

      router.push(`/results?tutorial=${encodedTutorial}&examples=${encodedExamples}`);
    } catch (error) {
      console.error('Error fetching content:', error);
      alert('An error occurred while generating content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-10 to-blue-200 text-gray-900">
      <Header />
      <section className="py-16">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-5xl md:text-5xl font-extrabold mb-6 text-gray-800">
            Unlock Your Potential
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-gray-700">
            Receive detailed tutorials and practical examples to advance <span className="bg-gradient-to-r from-[#4895ef] to-[#c77dff] bg-clip-text text-transparent">your skills and career goals</span>
          </p>
          <form onSubmit={handleSubmit} className="bg-white shadow-0xl rounded-xl p-10 mx-auto max-w-4xl border border-gray-200">
              <label className="block mb-6">
                <span className="bg-gradient-to-r from-[#4895ef] to-[#c77dff] bg-clip-text text-transparent text-lg">Enter your skills or career goals</span>
                <textarea
                  className="form-textarea mt-3 block w-full border-blue-300 rounded-xl shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 p-3"
                  rows={5}
                  placeholder="e.g., 'I want to improve my data science skills'"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                ></textarea>
              </label>
              <div className="flex justify-center mt-8">
                <button
                  type="submit"
                  className="bg-btn-grad text-white px-4 py-6 text-lg w-64 rounded-full font-semibold bg-[length:200%] bg-left transition-bg duration-500 hover:bg-right rounded-full"
                  disabled={loading}
                >
                  {loading ? 'Generating Content...' : 'Analyze'}
                </button>
              </div>
            </form>
        </div>
      </section>

      <div className="container mx-auto px-4 mb-12">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">
          Key Features
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {/* Feature 1 */}
          <div className="flex flex-col items-center p-8 w-full md:w-[300px] min-h-[350px]">
            <div className="rounded-full p-4 mb-4">
              <img src="/tutorials.png" alt="Detailed Tutorials" className="h-16 w-16" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Detailed Tutorials
            </h3>
            <p className="text-gray-500 text-center">
              Comprehensive tutorials covering fundamental concepts, explanations, syntax, and practical examples.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center p-8 w-full md:w-[300px] min-h-[350px]">
            <div className="rounded-full p-4 mb-4">
              <img src="/learning.png" alt="Practical Examples" className="h-16 w-16" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Practical Examples
            </h3>
            <p className="text-gray-500 text-center">
              A list of practical examples and scenarios with explanations to help apply and understand concepts.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center p-8 w-full md:w-[300px] min-h-[350px]">
            <div className="rounded-full p-4 mb-4">
              <img src="/growth.png" alt="Skill Growth" className="h-16 w-16" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Skill Growth
            </h3>
            <p className="text-gray-500 text-center">
              Personalized content designed to enhance and grow your skills and career goals based on your input.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SkillAssessmentPage;
