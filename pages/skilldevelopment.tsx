import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import '../app/globals.css';

const interviewcopilot = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#f5f5f5] to-white">
      <Header />
      <main className="flex-grow container mx-auto text-center py-20">
        {/* Heading */}
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
        ACTIVE AI SUPPORT
        </h1>
        <p className="text-2xl mb-12 bg-gradient-to-r from-[#4895ef] to-[#c77dff] bg-clip-text text-transparent">
            Bluepilot delivering actionable insights instantly
        </p>

        {/* Features Section */}
        <h2 className="text-3xl font-semibold mb-10">
          Features Of <span className="bg-gradient-to-r from-[#4895ef] to-[#c77dff] bg-clip-text text-transparent">Bluepilot</span>
        </h2>
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
        {/* Benefits Section */}
        <h2 className="text-3xl font-semibold mb-10">
          Why Choose <span className="bg-gradient-to-r from-[#4895ef] to-[#c77dff] bg-clip-text text-transparent">Bluepilot ?</span>
        </h2>

        <div className="max-w-4xl mx-auto mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 justify-center">
          <div className="flex flex-col p-8 border rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg bg-white max-w-md min-h-[300px]">
            <div className="flex-1 flex flex-col justify-between">
              <div className="flex items-center mb-2">

                <img className="w-7 h-7 mr-4" src="/boost.png" alt="Boost Confidence Icon" />
                <h3 className="text-xl font-bold text-gray-800">Boost Confidence</h3>
              </div>
              <p className="text-gray-600 text-start">
                Our AI-driven suggestions enhance your interview readiness, <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4895ef] to-[#c77dff] backdrop-blur-md">helping you approach interviews</span> with confidence.
              </p>
            </div>
          </div>

          <div className="flex flex-col p-8 border rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg bg-white max-w-md min-h-[300px]">
            <div className="flex-1 flex flex-col justify-between">
              <div className="flex items-center mb-2">

                <img className="w-7 h-7 mr-4" src="/save.png" alt="Save Time Icon" />
                <h3 className="text-xl font-bold text-gray-800">Save Time</h3>
              </div>
              <p className="text-gray-600 text-start">
                Maximize your preparation time with <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4895ef] to-[#c77dff] backdrop-blur-md">real-time feedback and tailored advice</span> to focus on your strengths.
              </p>
            </div>
          </div>

          <div className="flex flex-col p-8 border rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg bg-white max-w-md min-h-[300px]">
            <div className="flex-1 flex flex-col justify-between">
              <div className="flex items-center mb-2">
            
                <img className="w-7 h-7 mr-4" src="/enhance.png" alt="Enhance Communication Skills Icon" />
                <h3 className="text-xl font-bold text-gray-800">Enhance Communication Skills</h3>
              </div>
              <p className="text-gray-600 text-start">
                Learn to articulate your thoughts more effectively with <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4895ef] to-[#c77dff] backdrop-blur-md">personalized response generation</span> and practice sessions.
              </p>
            </div>
          </div>

          <div className="flex flex-col p-8 border rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg bg-white max-w-md min-h-[300px]">
            <div className="flex-1 flex flex-col justify-between">
              <div className="flex items-center mb-2">
              
                <img className="w-7 h-7 mr-4" src="/feedback.png" alt="Real-Time Feedback Icon" />
                <h3 className="text-xl font-bold text-gray-800">Real-Time Feedback</h3>
              </div>
              <p className="text-gray-600 text-start">
                Get instant feedback on your answers,<span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4895ef] to-[#c77dff] backdrop-blur-md"> helping you refine your responses,</span> and improve your overall performance.
              </p>
            </div>
          </div>
        </div>
        </div>
        {/* Support Software Section */}
          <div className="bg-[#F0EBFF] py-6 px-4 rounded-lg">
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

        {/* Call to Action */}
        <div className="mt-20">
        <h2 className="text-4xl font-semibold mb-10">
          Ready to <span className="bg-gradient-to-r from-[#4895ef] to-[#c77dff] bg-clip-text text-transparent">Get Started ?</span>
        </h2>
          <Link href="/get-started">
          <button
                  className="bg-btn-grad text-white bg-[length:200%] bg-left transition-bg duration-500 hover:bg-right rounded-full px-4 py-6 text-lg w-64"
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

export default interviewcopilot;
