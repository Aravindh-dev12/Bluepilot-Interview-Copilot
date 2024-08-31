import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faBrain, faFile, faSuitcase, faBook, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import Skilldevelopment from './skilldevelopment'; 
import Resumebuilder from './resumebuilder'; 
import ApplicationTailor from './applicationtailor';
import Question from './question';
import Interviewpilot from './interviewpilot';
import Pricing from './pricing'
import '../app/globals.css';
import Link from "next/link";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard'); // 'dashboard' is the default section

  const handleNavClick = (section: string) => {
    setActiveSection(section);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-1/6 bg-gray-200 text-gray-900 flex flex-col justify-between p-4 fixed h-full">
        <div>
          <Link href="/" passHref>
            <h2 className="text-3xl font-bold text-gray-800 cursor-pointer ml-2">
              Bluepilot
            </h2>
          </Link>
          <nav className="mt-12">
            <h2 className="text-sm font-bold text-gray-600 ml-2 mb-4">Tools</h2>
            <ul>
              <li className="mb-12">
                <a
                  onClick={() => handleNavClick('interviewpilot')}
                  aria-label="Interview Copilot"
                  className={`flex items-center space-x-7 text-gray-900 text-lg cursor-pointer ${
                    activeSection === 'interviewcopilot' ? 'font-bold text-blue-500' : ''
                  }`}
                >
                  <FontAwesomeIcon icon={faClipboard} size="lg" />
                  <span>Interview Copilot</span>
                </a>
              </li>
              <li className="mb-12">
                <a
                  onClick={() => handleNavClick('skilldevelopment')}
                  aria-label="AI Skill Development"
                  className={`flex items-center space-x-6 text-gray-900 text-lg cursor-pointer ${
                    activeSection === 'skilldevelopment' ? 'font-bold text-blue-500' : ''
                  }`}
                >
                  <FontAwesomeIcon icon={faBrain} size="lg" />
                  <span>AI Skill Development</span>
                </a>
              </li>
              <li className="mb-12">
                <a
                  onClick={() => handleNavClick('resumebuilder')}
                  aria-label="AI Resume Builder"
                  className={`flex items-center space-x-8 text-gray-900 text-lg cursor-pointer ${
                    activeSection === 'resumebuilder' ? 'font-bold text-blue-500' : ''
                  }`}
                >
                  <FontAwesomeIcon icon={faFile} size="lg" />
                  <span>AI Resume Builder</span>
                </a>
              </li>
              <li className="mb-12">
                <a
                  onClick={() => handleNavClick('applicationtailor')}
                  aria-label="Application Tailor"
                  className={`flex items-center space-x-6 text-gray-900 text-lg cursor-pointer ${
                    activeSection === 'applicationtailor' ? 'font-bold text-blue-500' : ''
                  }`}
                >
                  <FontAwesomeIcon icon={faSuitcase} size="lg" />
                  <span>Application Tailor</span>
                </a>
              </li>
              <li className="mb-12">
                <a
                  onClick={() => handleNavClick('question')}
                  aria-label="Question Bank"
                  className={`flex items-center space-x-6 text-gray-900 text-lg cursor-pointer ${
                    activeSection === 'question' ? 'font-bold text-blue-500' : ''
                  }`}
                >
                  <FontAwesomeIcon icon={faBook} size="lg" />
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
              <a href="#" className="flex items-center space-x-6 text-gray-900 text-lg">
                <FontAwesomeIcon icon={faQuestionCircle} size="lg" />
                <span>Help Center</span>
              </a>
            </li>
          </ul>
          <div className="flex items-center mb-6">
            <div className="w-14 h-14 bg-gray-300 rounded-full mr-3"></div>
            <span className="font-semibold text-lg">John Doe</span>
          </div>
          <Link href="/pricing">
          <button
            className="w-full bg-btn-grad text-black bg-[length:200%] bg-left transition-bg duration-500 hover:bg-right rounded-full py-3"
            aria-label="Subscribe"
          >
            Subscribe
          </button>
          </Link>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 min-w-0 p-4 ml-[16.67%] overflow-y-auto">
        {activeSection === 'dashboard' && (
          <>
            {/* Dashboard content here */}
          </>
        )}
        {activeSection === 'skilldevelopment' && <Skilldevelopment />}
        {activeSection === 'resumebuilder' && <Resumebuilder />}
        {activeSection === 'applicationtailor' && <ApplicationTailor />}
        {activeSection === 'question' && <Question />}
        {activeSection === 'interviewpilot' && <Interviewpilot/> }
        {activeSection === 'pricing' && <Pricing />}
      </main>
    </div>
  );
};

export default Dashboard;
