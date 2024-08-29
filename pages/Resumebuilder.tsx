import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../app/globals.css';

const API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY || ''; // Use environment variable
const API_URL = 'https://api.openai.com/v1/completions';

const generateContent = async (prompt: string) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 500,
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.choices[0].text;
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
};

const ResumeCoverLetterBuilder: React.FC = () => {
  const [details, setDetails] = useState<string>('');
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [templateType, setTemplateType] = useState<'resume' | 'coverLetter'>('resume');

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const prompt = `Create a ${templateType} based on the following details: ${details}`;
      const content = await generateContent(prompt);
      setGeneratedContent(content);
    } catch (error) {
      console.error('Failed to generate content');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="p-4 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Resume and Cover Letter Builder</h1>
        <div className="mb-4">
          <label htmlFor="templateType" className="block text-lg font-medium mb-2">Select Template Type:</label>
          <select
            id="templateType"
            className="w-full p-2 border border-gray-300 rounded"
            value={templateType}
            onChange={(e) => setTemplateType(e.target.value as 'resume' | 'coverLetter')}
          >
            <option value="resume">Resume</option>
            <option value="coverLetter">Cover Letter</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="details" className="block text-lg font-medium mb-2">Enter Details:</label>
          <textarea
            id="details"
            className="w-full p-2 border border-gray-300 rounded h-40"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>
        <button
          onClick={handleGenerate}
          className="bg-blue-500 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate'}
        </button>
        {generatedContent && (
          <div className="mt-4 p-4 border border-gray-300 rounded">
            <h2 className="text-xl font-bold mb-2">{templateType === 'resume' ? 'Resume' : 'Cover Letter'}</h2>
            <pre className="whitespace-pre-wrap">{generatedContent}</pre>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ResumeCoverLetterBuilder;
