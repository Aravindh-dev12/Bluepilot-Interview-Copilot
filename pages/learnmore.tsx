import Header from "../components/Header";
import Footer from "../components/Footer";

const LearnMore = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#FDEAE8] to-white">
      <Header />
      <main className="flex-grow container mx-auto text-center py-20">
        {/* Heading */}
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Real-time AI Suggestions
        </h1>
        <p className="text-xl text-gray-500 mb-12">
          Interview Copilot™ generating actionable guidance in real-time
        </p>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {/* Feature 1 */}
          <div className="flex flex-col items-center">
            <div className="bg-[#FA6E41] rounded-full p-3 mb-4">
              <img src="/icons/contextual-awareness.svg" alt="Contextual Awareness" className="h-10 w-10"/>
            </div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Contextual Awareness
            </h2>
            <p className="text-gray-500 text-center max-w-xs">
              Generates tailored responses by analyzing job descriptions and company details for each interview.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center">
            <div className="bg-[#FA6E41] rounded-full p-3 mb-4">
              <img src="/icons/personalized-responses.svg" alt="Personalized Responses" className="h-10 w-10"/>
            </div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Personalized Responses
            </h2>
            <p className="text-gray-500 text-center max-w-xs">
              Craft personalized answers that highlight your background, skills, and experiences to meet interviewers expectations.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center">
            <div className="bg-[#FA6E41] rounded-full p-3 mb-4">
              <img src="/icons/customizable-preparation.svg" alt="Customizable Preparation" className="h-10 w-10"/>
            </div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Customizable Preparation
            </h2>
            <p className="text-gray-500 text-center max-w-xs">
              Train and customize your copilot with your materials, like pre-prepared Q&A, for tailored performance.
            </p>
          </div>
        </div>

        {/* Support Software Section */}
        <div className="bg-[#F0EBFF] py-6 px-4 rounded-lg">
          <p className="text-gray-500 text-lg mb-4">support software</p>
          <div className="flex justify-center space-x-6">
            <img src="/icons/zoom.svg" alt="Zoom" className="h-8"/>
            <img src="/icons/webex.svg" alt="Webex" className="h-8"/>
            <img src="/icons/ringcentral.svg" alt="RingCentral" className="h-8"/>
            <img src="/icons/teams.svg" alt="Microsoft Teams" className="h-8"/>
            <img src="/icons/skype.svg" alt="Skype" className="h-8"/>
            <img src="/icons/meet.svg" alt="Google Meet" className="h-8"/>
            <img src="/icons/chime.svg" alt="Amazon Chime" className="h-8"/>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LearnMore;
