import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { OpenAI } from 'openai'; // Ensure this is the correct import based on your OpenAI package version
import '../app/globals.css';

const JobApplicationTailor: React.FC = () => {
  const [resume, setResume] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (e.target.files) {
      setter(e.target.files[0]);
    }
  };

  const handleFileToText = async (file: File | null): Promise<string> => {
    if (!file) return '';
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const resumeText = await handleFileToText(resume);
      const coverLetterText = await handleFileToText(coverLetter);

      // OpenAI API configuration
      const openai = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || '',
      });

      // Generate tailored content using OpenAI API
      const prompt = `
        Tailor the following resume and cover letter to match this job description:
        
        Job Description: ${jobDescription}
        
        Resume: ${resumeText}
        
        Cover Letter: ${coverLetterText}
      `;

      const response = await openai.completions.create({
        model: 'text-davinci-003',
        prompt: prompt,
        max_tokens: 1500,
        temperature: 0.7,
      });

      const tailoredContent = response.choices[0]?.text || '';
      // Redirect to results page with the tailored content
      router.push({
        pathname: '/application-result',
        query: { tailoredContent },
      });
    } catch (error) {
      console.error('Error tailoring application:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <div className="py-8">
        <div className="text-center">
          <h2 className="text-4xl md:text-4xl font-bold mb-4 text-gray-800">
            CRAFTING THE PERFECT FIT FOR SUCCESS
          </h2>
          <p className="text-2xl mb-12 bg-gradient-to-r from-[#000000] to-[#000000] bg-clip-text text-transparent">
            Master the Art of Tailoring AI Job Applications for{' '}
            <span className="bg-gradient-to-r from-[#4895ef] to-[#c77dff] bg-clip-text text-transparent">
              Optimal Success in a Competitive Market
            </span>
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg mb-20 p-8">
        <section>
          <h2 className="text-2xl text-center font-semibold mb-4 bg-gradient-to-r from-[#4895ef] to-[#c77dff] bg-clip-text text-transparent">
            Optimize Your Job Applications
          </h2>
          {/* Form Section */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="resume" className="block text-sm font-medium text-gray-700">
                Upload Your Resume
              </label>
              <input
                type="file"
                id="resume"
                name="resume"
                onChange={(e) => handleFileChange(e, setResume)}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700">
                Upload Your Cover Letter
              </label>
              <input
                type="file"
                id="coverLetter"
                name="coverLetter"
                onChange={(e) => handleFileChange(e, setCoverLetter)}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700">
                Job Description
              </label>
              <textarea
                id="jobDescription"
                name="jobDescription"
                rows={6}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                placeholder="Paste the job description here..."
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-btn-grad text-black bg-[length:200%] bg-left transition-bg duration-500 hover:bg-right rounded-full px-4 py-6 text-lg w-64"
              >
                {loading ? 'Tailoring...' : 'Tailor My Application'}
              </button>
            </div>
          </form>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default JobApplicationTailor;
