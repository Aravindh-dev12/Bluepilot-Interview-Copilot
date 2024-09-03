import React, { useState } from 'react';
import { OpenAI } from 'openai';
import '../app/globals.css';

const JobApplicationTailor: React.FC = () => {
  const [resume, setResume] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [tailoredContent, setTailoredContent] = useState<string | null>(null);

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
      const openai = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || '',
      });

      let prompt = `
        Tailor the following resume to match this job description:
        
        Job Description: ${jobDescription}
        
        Resume: ${resumeText}
      `;

      if (coverLetter) {
        prompt += `

        Cover Letter: ${coverLetterText}
        `;
      }

      const response = await openai.completions.create({
        model: 'text-davinci-003',
        prompt: prompt,
        max_tokens: 1500,
        temperature: 0.7,
      });

      const tailoredText = response.choices[0]?.text || '';
      setTailoredContent(tailoredText);
    } catch (error) {
      console.error('Error tailoring application:', error);
      setTailoredContent('An error occurred while tailoring your application.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="py-8">
        <div className="text-start">
          <h2 className="text-2xl md:text-2xl font-bold mb-2 text-gray-800">
            Optimize Your Job Application
          </h2>
          <p className="text-lg mb-12 bg-gradient-to-r from-[#000000] to-[#000000] bg-clip-text text-transparent">
            Upload your resume and cover letter, then provide the job description to receive a tailored application.
            This tool helps you enhance your job application with personalized content to match the requirements of your target job.
          </p>
        </div>
      </div>
      <main className="flex-grow w-full max-w-4xl mx-auto bg-transparent shadow-lg rounded-lg mb-8 pt-2 p-8">
        {!tailoredContent ? (
          <section>
            <form className="space-y-6 mt-[-20px]" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="resume" className="block text-sm font-medium text-gray-700">
                  Upload Your Resume
                </label>
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  onChange={(e) => handleFileChange(e, setResume)}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-black-900 focus:border-black-900"
                />
              </div>

              <div>
                <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700">
                  Upload Your Cover Letter (Optional)
                </label>
                <input
                  type="file"
                  id="coverLetter"
                  name="coverLetter"
                  onChange={(e) => handleFileChange(e, setCoverLetter)}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-black-500 focus:border-black-900"
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
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-black-900 focus:border-black-900"
                  placeholder="Paste the job description here..."
                />
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="border-2 border-black bg-gray-100 text-black px-4 py-2 text-lg w-54 rounded-full hover:bg-gray-100 mb-1"
                >
                  {loading ? 'Tailoring...' : 'Try My Application'}
                </button>
              </div>
            </form>
          </section>
        ) : (
          <section>
            <h1 className="text-center text-3xl font-bold mb-6 text-black-600">Application Result</h1>
            <div className="bg-transparent p-4 rounded-md whitespace-pre-wrap">
              {tailoredContent}
            </div>
            <button
              onClick={() => setTailoredContent(null)}
              className="mt-6 w-full bg-gray-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Try Another Application
            </button>
          </section>
        )}
      </main>
    </div>
  );
};

export default JobApplicationTailor;
