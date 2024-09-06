import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode, faChartLine, faNewspaper, faSlidersH, faTh, faLifeRing, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import Skilldevelopment from './skilldevelopment'; 
import Resumebuilder from './resumebuilder'; 
import Assistant from './assistant'; // Fixed import
import Question from './question';
import Interviewpilot from './interviewpilot';
import PricingPlans from './pricing'; 
import HelpcenterForm from './HelpcenterForm';
import Link from 'next/link'; // Import Link from next/link for Next.js projects
import '../app/globals.css';

type Section = 'dashboard' | 'interviewpilot' | 'skilldevelopment' | 'resumebuilder' | 'applicationtailor' | 'question' | 'pricing' | 'HelpcenterForm';

const Dashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleNavClick = (section: Section) => {
    setActiveSection(section);
    setIsSidebarOpen(false); // Close sidebar after navigating
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        w-4/5 md:w-1/6 bg-gray-200 text-gray-900 flex flex-col justify-between p-4 transition-transform duration-300 ease-in-out z-50 md:translate-x-0 md:static md:flex-shrink-0`}>
        <div className="flex flex-col h-full justify-between">
          <div>
            <Link href="/">
              <h2 className="text-3xl font-bold text-gray-800 cursor-pointer ml-4">Bluepilot</h2>
            </Link>
            <nav className="mt-10">
              <h2 className="text-sm font-bold text-gray-600 ml-2 mb-4 ">Tools</h2>
              <ul>
                <li className="mb-12">
                  <a
                    onClick={() => handleNavClick('interviewpilot')}
                    className={`flex items-center space-x-7 text-gray-900 text-1xl cursor-pointer ${
                      activeSection === 'interviewpilot' ? 'font-bold text-blue-500' : ''
                    }`}
                  >
                    <FontAwesomeIcon icon={faLaptopCode} size="lg" />
                    <span>Interview Copilot</span>
                  </a>
                </li>
                <li className="mb-12">
                  <a
                    onClick={() => handleNavClick('skilldevelopment')}
                    className={`flex items-center space-x-8 text-gray-900 text-1xl cursor-pointer ${
                      activeSection === 'skilldevelopment' ? 'font-bold text-blue-500' : ''
                    }`}
                  >
                    <FontAwesomeIcon icon={faChartLine} size="lg" />
                    <span>AI Skill Development</span>
                  </a>
                </li>
                <li className="mb-12">
                  <a
                    onClick={() => handleNavClick('resumebuilder')}
                    className={`flex items-center space-x-8 text-gray-900 text-1xl cursor-pointer ${
                      activeSection === 'resumebuilder' ? 'font-bold text-blue-500' : ''
                    }`}
                  >
                    <FontAwesomeIcon icon={faNewspaper} size="lg" />
                    <span>AI Resume Builder</span>
                  </a>
                </li>
                <li className="mb-12">
                  <a
                    onClick={() => handleNavClick('assistant')}
                    className={`flex items-center space-x-8 text-gray-900 text-1xl cursor-pointer ${
                      activeSection === 'assistant' ? 'font-bold text-blue-500' : ''
                    }`}
                  >
                    <FontAwesomeIcon icon={faSlidersH} size="lg" />
                    <span>Career Assistant</span>
                  </a>
                </li>
                <li className="mb-12">
                  <a
                    onClick={() => handleNavClick('question')}
                    className={`flex items-center space-x-8 text-gray-900 text-1xl cursor-pointer ${
                      activeSection === 'question' ? 'font-bold text-blue-500' : ''
                    }`}
                  >
                    <FontAwesomeIcon icon={faTh} size="lg" />
                    <span>Question Bank</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div>
            <ul>
              <h2 className="text-sm font-bold text-gray-600 ml-2 mb-4">Settings</h2>
              <li className="mb-14">
                <a
                  onClick={() => handleNavClick('HelpcenterForm')}
                  className="flex items-center space-x-8 text-gray-900 text-1xl cursor-pointer"
                >
                  <FontAwesomeIcon icon={faLifeRing} size="lg" />
                  <span>Help Center</span>
                </a>
              </li>
            </ul>
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 bg-gray-300 rounded-full mr-3"></div>
              <span className="font-semibold text-1xl">John Doe</span>
            </div>
            <button
              className="w-full bg-btn-grad text-black bg-[length:200%] bg-left transition-bg duration-500 hover:bg-right rounded-full py-3"
              aria-label="Subscribe"
              onClick={() => handleNavClick('pricing')}
            >
              Subscribe
            </button>
          </div>
        </div>
      </aside>

      {/* Hamburger Menu */}
      <div className={`fixed top-4 ${isSidebarOpen ? 'left-80' : 'left-4'} z-50 md:hidden`}>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} aria-label="Toggle sidebar">
          <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faBars} size="2x" />
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 min-w-0 p-4 ml-0 md:ml-[1.0%] overflow-y-auto">
        {activeSection === 'dashboard' && (
          <>
            {/* Dashboard content here */}
          </>
        )}
        {activeSection === 'skilldevelopment' && <Skilldevelopment />}
        {activeSection === 'resumebuilder' && <Resumebuilder />}
        {activeSection === 'assistant' && <Assistant />}
        {activeSection === 'question' && <Question />}
        {activeSection === 'interviewpilot' && <Interviewpilot />}
        {activeSection === 'pricing' && <PricingPlans />} 
        {activeSection === 'HelpcenterForm' && <HelpcenterForm />}
      </main>
    </div>
  );
};

export default Dashboard;
