import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import '../app/globals.css';

const QuestionBankPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#f5f5f5] to-white">
      {/* Header */}
      <Header />

      <main className="flex-grow container mx-auto text-center py-20">
        {/* Heading */}
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Question Bank Dashboard
        </h1>
        <p className="text-2xl mb-12 bg-gradient-to-r from-[#4895ef] to-[#c77dff] bg-clip-text text-transparent">
          Your comprehensive resource for all company questions and preparation.
        </p>

        {/* Features Section */}
        <h2 className="text-3xl font-semibold mb-10">
          Features Of <span className="bg-gradient-to-r from-[#4895ef] to-[#c77dff] bg-clip-text text-transparent">Question Bank</span>
        </h2>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {/* Feature 1 */}
            <div className="flex flex-col items-center p-8 w-full md:w-[300px] min-h-[350px]">
              <div className="rounded-full p-4 mb-4">
                <img src="/feature1.png" alt="Feature 1" className="h-16 w-16" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Extensive Question Bank
              </h3>
              <p className="text-gray-500 text-center">
                Access a wide range of questions from various companies and industries.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center p-8 w-full md:w-[300px] min-h-[350px]">
              <div className="rounded-full p-4 mb-4">
                <img src="/feature2.png" alt="Feature 2" className="h-16 w-16" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Customizable Filters
              </h3>
              <p className="text-gray-500 text-center">
                Filter questions based on difficulty, company, and topic to streamline your preparation.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center p-8 w-full md:w-[300px] min-h-[350px]">
              <div className="rounded-full p-4 mb-4">
                <img src="/feature3.png" alt="Feature 3" className="h-16 w-16" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Detailed Explanations
              </h3>
              <p className="text-gray-500 text-center">
                Each question comes with detailed explanations and solutions to enhance understanding.
              </p>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <h2 className="text-3xl font-semibold mb-10">
          Why Choose <span className="bg-gradient-to-r from-[#4895ef] to-[#c77dff] bg-clip-text text-transparent">Question Bank?</span>
        </h2>

        <div className="max-w-4xl mx-auto mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 justify-center">
            <div className="flex flex-col p-8 border rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg bg-white max-w-md min-h-[300px]">
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex items-center mb-2">
                  <img className="w-7 h-7 mr-4" src="/benefit1.png" alt="Benefit 1 Icon" />
                  <h3 className="text-xl font-bold text-gray-800">Comprehensive Coverage</h3>
                </div>
                <p className="text-gray-600 text-start">
                  Our question bank covers a wide range of topics, ensuring you are well-prepared for any interview.
                </p>
              </div>
            </div>

            <div className="flex flex-col p-8 border rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg bg-white max-w-md min-h-[300px]">
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex items-center mb-2">
                  <img className="w-7 h-7 mr-4" src="/benefit2.png" alt="Benefit 2 Icon" />
                  <h3 className="text-xl font-bold text-gray-800">Efficient Preparation</h3>
                </div>
                <p className="text-gray-600 text-start">
                  Save time with our efficient preparation tools and get the most relevant questions at your fingertips.
                </p>
              </div>
            </div>

            <div className="flex flex-col p-8 border rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg bg-white max-w-md min-h-[300px]">
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex items-center mb-2">
                  <img className="w-7 h-7 mr-4" src="/benefit3.png" alt="Benefit 3 Icon" />
                  <h3 className="text-xl font-bold text-gray-800">Enhanced Learning</h3>
                </div>
                <p className="text-gray-600 text-start">
                  Improve your interview skills with detailed feedback and personalized practice sessions.
                </p>
              </div>
            </div>

            <div className="flex flex-col p-8 border rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg bg-white max-w-md min-h-[300px]">
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex items-center mb-2">
                  <img className="w-7 h-7 mr-4" src="/benefit4.png" alt="Benefit 4 Icon" />
                  <h3 className="text-xl font-bold text-gray-800">Real-Time Updates</h3>
                </div>
                <p className="text-gray-600 text-start">
                  Get real-time updates and access to the latest questions and trends in the industry.
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
                <img src="/google_meet.svg" alt="Google Meet" className="h-8" />
                <span>Google Meet</span>
              </div>
              <div className="flex items-center space-x-2">
                <img src="/webex.svg" alt="Webex" className="h-8" />
                <span>Webex</span>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Button */}
        <div className="mt-12">
          <Link href="/get-started" className="bg-gradient-to-r from-[#4895ef] to-[#c77dff] text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:opacity-80 transition duration-200">
            Get Started
          </Link>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default QuestionBankPage;
