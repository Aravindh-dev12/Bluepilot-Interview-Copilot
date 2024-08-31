import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import '../app/globals.css';

const skill = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#f5f5f5] to-white">
      <Header />
      <main className="flex-grow container mx-auto text-center py-20">
        {/* Heading */}
        <h2 className="text-4xl md:text-4xl font-bold mb-4 text-gray-800">
          Boost Your Skills with AI
        </h2>
        <p className="text-2xl mb-12 bg-gradient-to-r from-[#000000] to-[#000000] bg-clip-text text-transparent">
          Empower your professional growth with <span className="bg-gradient-to-r from-[#4895ef] to-[#c77dff] bg-clip-text text-transparent"> AI-driven development </span>
        </p>

        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {/* Feature 1 */}
            <div className="flex flex-col items-center p-8 w-full md:w-[300px] min-h-[350px]">
              <div className="rounded-full p-4 mb-4">
                <img src="/precision.png" alt="Skill Analysis" className="h-16 w-16" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Skill Analysis
              </h3>
              <p className="text-gray-500 text-center">
                Get a comprehensive assessment of your current skill set and identify areas for improvement.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center p-8 w-full md:w-[300px] min-h-[350px]">
              <div className="rounded-full p-4 mb-4">
                <img src="/learning.png" alt="Personalized Learning" className="h-16 w-16" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Personalized Learning
              </h3>
              <p className="text-gray-500 text-center">
                Access tailored learning resources and exercises designed to fit your specific skill development needs.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center p-8 w-full md:w-[300px] min-h-[350px]">
              <div className="rounded-full p-4 mb-4">
                <img src="/save.png" alt="Progress Tracking" className="h-16 w-16" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Progress Tracking
              </h3>
              <p className="text-gray-500 text-center">
                Monitor your learning journey with detailed tracking and progress reports to stay on target.
              </p>
            </div>
          </div>
        </div>
        {/* Why Choose Us Section */}
        <h2 className="text-3xl font-semibold mt-10">
          Why Choose Our Skill Development Platform?
        </h2>
        <div className="max-w-4xl mx-auto mt-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-40 mt-20">
            {/* Top Section */}
            <div className="flex flex-col justify-center">
              <img src="/path/to/skill-icon.png" alt="Skill Icon" className="mb-6 w-16 h-16" />
              <div className="flex space-x-6">
                {/* Cards */}
                <div className="bg-white shadow-md rounded-lg p-4">
                  <img src="/path/to/skill-template1.png" alt="Skill Template 1" />
                </div>
                <div className="bg-white shadow-md rounded-lg p-4">
                  <img src="/path/to/skill-template2.png" alt="Skill Template 2" />
                </div>
                <div className="bg-white shadow-md rounded-lg p-4">
                  <img src="/path/to/skill-template3.png" alt="Skill Template 3" />
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center text-left w-full lg:w-[500px] mx-auto">
              <h2 className="text-3xl font-bold mb-4">Transform Your Skills with AI</h2>
              <p className="text-lg mb-6">
                Our AI-driven Skill Development platform offers personalized assessments, resources, and progress tracking to help you reach your professional goals. Optimize your learning experience and advance your skills with our expert guidance.
              </p>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col items-start text-left w-full lg:w-[500px] mx-auto">
              <h2 className="text-3xl font-bold mb-4">Create a Personalized Learning Path</h2>
              <p className="text-lg mb-6">
                Design a custom learning journey with our AI tool. Receive personalized exercises, actionable feedback, and targeted resources to effectively develop your skills and achieve your career objectives.
              </p>
            </div>

            <div className="flex justify-center">
              <img src="/path/to/skill-path-icon.png" alt="Custom Path Icon" className="mb-6 w-16 h-16" />
              <div className="bg-white shadow-md rounded-lg p-4">
                <img src="/path/to/skill-application-path.png" alt="Custom Learning Path" />
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20">
          <h2 className="text-4xl font-semibold mb-10">
            Ready to <span className="bg-gradient-to-r from-[#4895ef] to-[#c77dff] bg-clip-text text-transparent">Boost Your Skills?</span>
          </h2>
          <Link href="/dashboard">
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

export default skill;
