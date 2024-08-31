import React, { useState, useRef } from 'react';
import axios from 'axios';
import '../app/globals.css';

// Constants
const API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY || ''; 
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

const Resumebuilder: React.FC = () => {
  const [details, setDetails] = useState<string>('');
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [templateType, setTemplateType] = useState<'resume' | 'coverLetter'>('resume');
  const [showForm, setShowForm] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle the file (e.g., read the contents, upload it, etc.)
      console.log('File selected:', file);
    }
  };

  return (
    <div>
      <div className="container mx-auto text-start px-4">
        <h2 className="text-3xl font-bold text-left mt-10 mb-6 text-gray-800">
          Craft Your Professional Resume with AI Effortlessly
        </h2>
        <p className="text-lg mb-6 bg-gradient-to-r from-[#000000] to-[#000000] bg-clip-text text-transparent text-left">
          Input your career details to get a professionally crafted resume tailored to your needs. This AI-powered tool enhances your resume with personalized content to boost your career prospects.
        </p>
        <div className="flex items-center mb-8">
          <button
            onClick={() => setShowForm(true)}
            className="border-2 border-black bg-gray-100 text-black px-4 py-2 text-lg w-44 rounded-full hover:bg-gray-100"
          >
            Create
          </button>
          <div
            className="w-34 h-14 border-dashed border-2 border-gray-300 rounded ml-4 flex items-center justify-center cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            Drag & Drop Your File
          </div>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileInputChange}
          />
        </div>
        {/* Modal */}
        {showForm && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl relative">
              <button
                className="absolute top-4 right-4 text-gray-600 text-3xl"
                onClick={() => setShowForm(false)}
              >
                &times;
              </button>
              <h3 className="text-xl font-bold mb-4">{templateType === 'resume' ? 'Generate Resume' : 'Generate Cover Letter'}</h3>
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
              <div className="flex justify-center w-full mt-4">
                <button
                  onClick={handleGenerate}
                  className="border-2 border-black bg-gray-100 text-black px-4 py-2 text-lg w-44 rounded-full hover:bg-gray-100"
                  disabled={loading}
                >
                  {loading ? 'Generating...' : 'Generate'}
                </button>
              </div>
            </div>
          </div>
        )}

        {generatedContent && (
          <div className="mt-4 p-4 border border-gray-300 rounded">
            <h2 className="text-xl font-bold mb-2">{templateType === 'resume' ? 'Resume' : 'Cover Letter'}</h2>
            <pre className="whitespace-pre-wrap">{generatedContent}</pre>
            <div className="mt-4 flex space-x-4">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded"
                onClick={() => {
                  // Logic for editing the content
                  setDetails(generatedContent || '');
                }}
              >
                Edit
              </button>
              <button
                className="bg-green-500 text-white py-2 px-4 rounded"
                onClick={() => {
                  // Logic for downloading the content
                  const blob = new Blob([generatedContent || ''], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `generated_${templateType}.txt`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
              >
                Download
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Resumebuilder;
