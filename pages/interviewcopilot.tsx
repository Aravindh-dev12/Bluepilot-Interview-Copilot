import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import '../app/globals.css';

const InterviewCopilot = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#f5f5f5] to-white">
      <Header />
      <main className="flex-grow container mx-auto text-center py-20">
        {/* Heading */}
        <h2 className="text-4xl md:text-4xl font-bold mb-4 text-gray-800">
         AI-POWERED SOLUTIONS FOR IMMEDIATE SUPPORT
        </h2>
        <p className="text-2xl mb-12 bg-gradient-to-r from-[#000000] to-[#000000] bg-clip-text text-transparent">
            Bluepilot delivering actionable <span className="bg-gradient-to-r from-[#4895ef] to-[#c77dff] bg-clip-text text-transparent"> insights instantly </span></p>
        <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {/* Feature 1 */}
        <div className="flex flex-col items-center p-8 w-full md:w-[300px] min-h-[350px]">
          <div className="rounded-full p-4 mb-4">
            <img src="/insight.png" alt="Situational Insight" className="h-16 w-16" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Situational Insight
          </h3>
          <p className="text-gray-500 text-center">
            Offers specialized responses by interpreting job details and company information for each interview.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col items-center p-8 w-full md:w-[300px] min-h-[350px]">
          <div className="rounded-full p-4 mb-4">
            <img src="/answer.png" alt="Adapted Answers" className="h-16 w-16" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Adapted Answers
          </h3>
          <p className="text-gray-500 text-center">
            Form individualized answers that accentuate your background, skills, and experience to match interviewers' expectations.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col items-center p-8 w-full md:w-[300px] min-h-[350px]">
          <div className="rounded-full p-4 mb-4">
            <img src="/preparation.png" alt="Tailored Preparation" className="h-16 w-16" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Tailored Preparation
          </h3>
          <p className="text-gray-500 text-center">
            Enhance and tailor your copilot by integrating your personalized content to address specific performance and needs.
          </p>
        </div>
      </div>
      </div>
        {/* Support Software Section */}
          <div className="bg-[#F0EBFF] py-6 px-4 rounded-lg  w-100%">
            <div className="overflow-hidden whitespace-nowrap">
              <div className="flex items-center space-x-20 animate-scroll">
                <div className="flex items-center space-x-2">
                  <img src="/zoom.svg" alt="Zoom" className="h-8" />
                  <span>Zoom</span>
                </div>
                <div className="flex items-center space-x-2">
                  <img src="/teams.svg" alt="Microsoft Teams" className="h-8" />
                  <span>Microsoft Teams</span>
                </div>
                <div className="flex items-center space-x-2">
                  <img src="/skype.svg" alt="Skype" className="h-8" />
                  <span>Skype</span>
                </div>
                <div className="flex items-center space-x-2">
                  <img src="/google-meets.svg" alt="Google Meet" className="h-8" />
                  <span>Google Meet</span>
                </div>
                <div className="flex items-center space-x-2">
                  <img src="/amazon-chime.svg" alt="Amazon Chime" className="h-8" />
                  <span>Amazon Chime</span>
                </div>
              </div>
            </div>
          </div>
          <h2 className="text-3xl font-semibold mt-10">
          Why Choose Bluepilot ?
        </h2>
      <div className="max-w-4xl mx-auto mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-40 mt-20">
      
      {/* Top Section */}
      <div className="flex flex-col justify-center">
        <img src="/path/to/icon-ai.png" alt="AI Icon" className="mb-6 w-16 h-16" />
        <div className="flex space-x-6">
          {/* Cards */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <img src="/path/to/template1.png" alt="Template 1" />
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <img src="/path/to/template2.png" alt="Template 2" />
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <img src="/path/to/template3.png" alt="Template 3" />
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center text-left w-full lg:w-[500px] mx-auto">
        <h2 className="text-3xl font-bold mb-6">Ace Your Interviews with AI</h2>
        <p className="text-lg mt-4 mb-6">
          Our AI-powered Interview Copilot helps you excel by offering personalized feedback, practice questions, and tips for both technical and behavioral interviews. Tailored guidance ensures you perform at your best. Start preparing for your dream job today.
        </p>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col items-start text-left w-full lg:w-[500px] mx-auto">
        <h2 className="text-3xl font-bold mb-6">Real-time Audio Transcription</h2>
        <p className="text-lg mt-4 mb-6">
          Leverage real-time audio transcription to capture every spoken word during interviews with precision, ensuring that no details are missed and providing a reliable and accurate record of the conversation for thorough review and analysis.
        </p>
      </div>

      <div className="flex justify-center">
        <img src="/path/to/icon-path.png" alt="Custom Path Icon" className="mb-6 w-16 h-16" />
        <div className="bg-white shadow-md rounded-lg p-4">
          <img src="/path/to/custom-application-path.png" alt="Custom Application Path" />
        </div>
      </div>
    </div>
        </div>
        {/* Call to Action */}
        <div className="mt-20">
        <h2 className="text-4xl font-semibold mb-10">
          Ready to <span className="bg-gradient-to-r from-[#4895ef] to-[#c77dff] bg-clip-text text-transparent">Get Started ?</span>
        </h2>
          <Link href="/Interview">
          <button
                  className="bg-btn-grad text-black bg-[length:200%] bg-left transition-bg duration-500 hover:bg-right rounded-full px-4 py-6 text-lg w-64"
                >
                  Get Started
          </button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default InterviewCopilot;
