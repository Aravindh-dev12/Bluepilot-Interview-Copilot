// src/components/QuestionGenerator.tsx
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../app/globals.css'; // Adjust path if necessary

const QuestionGenerator: React.FC = () => {
  const [company, setCompany] = useState<string>('');
  const [industry, setIndustry] = useState<string>('');
  const [candidateProfile, setCandidateProfile] = useState<string>('');
  const [questions, setQuestions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateQuestions = async () => {
    setLoading(true);
    setError(null);

    const prompt = `
      Generate relevant interview questions based on the following information:
      - Company: ${company}
      - Industry Trends: ${industry}
      - Candidate Profile: ${candidateProfile}
      
      Provide 5 challenging and insightful questions.
    `;

    try {
      const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'text-davinci-003', // Use the latest model or adjust as necessary
          prompt,
          max_tokens: 150,
          n: 1,
          stop: ['\n'],
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      const text: string = data.choices[0].text; // Ensure text is a string
      const generatedQuestions: string[] = text.trim().split('\n').filter((q: string) => q.trim() !== ''); // Type `q` explicitly
      setQuestions(generatedQuestions);
    } catch (err) {
      setError('Error generating questions. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow max-w-4xl mx-auto p-6">
        {/* Service Cards Section */}
        <section className="mb-12">
          <header className="text-center mb-8">
            <h2 className="text-3xl font-semibold mb-10">
              SMART INTERVIEW QUESTIONS
              <span className="bg-gradient-to-r from-[#4895ef] to-[#c77dff] bg-clip-text text-transparent"> FOR YOUR NEEDS </span>
            </h2>
            <p className="text-lg text-gray-600 mt-2">
              Skill mapping aligns individual skills with career development goals or job requirements.
            </p>
          </header>
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              {/* Feature 1 */}
              <div className="flex flex-col items-center p-8 w-full md:w-[300px] min-h-[350px]">
                <div className="rounded-full p-4 mb-4">
                  <img src="/question.png" alt="Tailored Preparation" className="h-16 w-16" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Tailored Questions
                </h3>
                <p className="text-gray-500 text-center">
                  Generate specific, high-quality interview questions tailored to your company, industry trends, and candidate profiles.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col items-center p-8 w-full md:w-[300px] min-h-[350px]">
                <div className="rounded-full p-4 mb-4">
                  <img src="/challenging.png" alt="Insightful and Challenging" className="h-16 w-16" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Insightful and Challenging
                </h3>
                <p className="text-gray-500 text-center">
                  Receive insightful and challenging questions to elevate your interview process and assess candidates effectively.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col items-center p-8 w-full md:w-[300px] min-h-[350px]">
                <div className="rounded-full p-4 mb-4">
                  <img src="/precision.png" alt="AI-Powered Precision" className="h-16 w-16" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  AI-Powered Precision
                </h3>
                <p className="text-gray-500 text-center">
                  Leverage the power of AI to generate precise and relevant questions based on current industry trends and company specifics.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Support Software Section */}
        <section className="mb-12">
    <div className="bg-[#F0EBFF] py-6 px-4 rounded-lg">
        <h2 className="text-center font-bold text-2xl mb-8">Prepare for All Major Companies</h2>
        <div className="max-w-6xl mx-auto space-y-6">
            {/* Row 1 */}
            <div className="flex justify-center items-center space-x-8">
                <img src="/zoho.png" alt="Zoho" className="h-12 w-auto" />
                <img src="/barclays.png" alt="Barclays" className="h-12 w-auto" />
                <img src="/atlassian.png" alt="Atlassian" className="h-12 w-auto" />
                <img src="/salesforce.png" alt="Salesforce" className="h-12 w-auto" />
                <img src="/jio.png" alt="Jio" className="h-12 w-auto" />
                <img src="/hexaware.png" alt="Hexaware" className="h-12 w-auto" />
                <img src="/dxc.png" alt="DXC Technology" className="h-12 w-auto" />
            </div>
            {/* Row 2 */}
            <div className="flex justify-center items-center space-x-8">
                <img src="/american_express.png" alt="American Express" className="h-12 w-auto" />
                <img src="/jpmorgan.png" alt="JP Morgan" className="h-12 w-auto" />
                <img src="/bosch.png" alt="Bosch" className="h-12 w-auto" />
                <img src="/zs.png" alt="ZS Associates" className="h-12 w-auto" />
                <img src="/ntt_data.png" alt="NTT Data" className="h-12 w-auto" />
                <img src="/mphasis.png" alt="Mphasis" className="h-12 w-auto" />
                <img src="/nagarro.png" alt="Nagarro" className="h-12 w-auto" />
            </div>
            {/* Row 3 */}
            <div className="flex justify-center items-center space-x-8">
                <img src="/sapient.png" alt="Sapient" className="h-12 w-auto" />
                <img src="/flipkart.png" alt="Flipkart" className="h-12 w-auto" />
                <img src="/cisco.png" alt="Cisco" className="h-12 w-auto" />
                <img src="/juspay.png" alt="Juspay" className="h-12 w-auto" />
                <img src="/mu_sigma.png" alt="Mu Sigma" className="h-12 w-auto" />
                <img src="/hcl.png" alt="HCL" className="h-12 w-auto" />
                <img src="/lnt_infotech.png" alt="L&T Infotech" className="h-12 w-auto" />
            </div>
            {/* Row 4 */}
            <div className="flex justify-center items-center space-x-8">
                <img src="/capgemini.png" alt="Capgemini" className="h-12 w-auto" />
                <img src="/wipro.png" alt="Wipro" className="h-12 w-auto" />
                <img src="/tcs.png" alt="TCS" className="h-12 w-auto" />
                <img src="/amazon.png" alt="Amazon" className="h-12 w-auto" />
                <img src="/adobe.png" alt="Adobe" className="h-12 w-auto" />
                <img src="/tech_mahindra.png" alt="Tech Mahindra" className="h-12 w-auto" />
                <img src="/accenture.png" alt="Accenture" className="h-12 w-auto" />
            </div>
        </div>
    </div>
</section>


        {/* Question Generation Section */}
        <section>
          <h1 className="text-2xl font-bold mb-4">AI-Powered Contextual Question Generator</h1>
          <div className="space-y-4">
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company:</label>
              <input
                type="text"
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="industry" className="block text-sm font-medium text-gray-700">Industry Trends:</label>
              <input
                type="text"
                id="industry"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="profile" className="block text-sm font-medium text-gray-700">Candidate Profile:</label>
              <textarea
                id="profile"
                value={candidateProfile}
                onChange={(e) => setCandidateProfile(e.target.value)}
                rows={4}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <button
              onClick={handleGenerateQuestions}
              className="bg-btn-grad text-white bg-[length:200%] bg-left transition-bg duration-500 hover:bg-right rounded-full px-4 py-6 text-lg w-64 mx-auto block"
            >
              Generate Questions
            </button>
            {loading && <p className="text-gray-500">Generating questions...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {questions.length > 0 && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold">Generated Questions:</h2>
                <ul className="list-disc pl-5 mt-2">
                  {questions.map((question, index) => (
                    <li key={index} className="text-gray-800">{question}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default QuestionGenerator;
