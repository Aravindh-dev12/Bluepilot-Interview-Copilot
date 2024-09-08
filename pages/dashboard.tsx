import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode, faChartLine, faNewspaper, faSlidersH, faTh, faLifeRing, faBars, faTimes, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Modal from '../components/modal';
import '../app/globals.css';

// Lazy load components
const Skilldevelopment = lazy(() => import('./skilldevelopment'));
const Resumebuilder = lazy(() => import('./resumebuilder'));
const Assistant = lazy(() => import('./assistant'));
const Question = lazy(() => import('./question'));
const Interviewpilot = lazy(() => import('./interviewpilot'));
const PricingPlans = lazy(() => import('./pricing'));
const HelpcenterForm = lazy(() => import('./HelpcenterForm'));
const Settings = lazy(() => import('./settings'));

type Section = 'dashboard' | 'interviewpilot' | 'skilldevelopment' | 'resumebuilder' | 'assistant' | 'question' | 'pricing' | 'HelpcenterForm' | 'settings';

const Dashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userName, setUserName] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    setUserName(storedUserName || 'User');

    // Removed dark mode handling

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSectionChange = (section: Section) => {
    setActiveSection(section);
    setIsSidebarOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  const handleLogout = () => {
    // Implement logout logic here
    console.log('Logged out');
  };

  const handleOpenSettings = () => {
    setIsSettingsOpen(true);
    setIsDropdownOpen(false);
  };

  const handleCloseSettings = () => {
    setIsSettingsOpen(false);
  };

  // Removed handleThemeToggle function

  const NavigationLink: React.FC<{ icon: any; section: Section; label: string }> = ({ icon, section, label }) => (
    <li className="mb-12">
      <a
        onClick={() => handleSectionChange(section)}
        role="button"
        className={`flex items-center space-x-8 text-gray-900 text-1xl cursor-pointer ${
          activeSection === section ? 'font-bold text-blue-500' : ''
        }`}
      >
        <FontAwesomeIcon icon={icon} size="lg" />
        <span>{label}</span>
      </a>
    </li>
  );

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
              <h2 className="text-sm font-bold text-gray-600 ml-2 mb-4">Tools</h2>
              <ul>
                <NavigationLink icon={faLaptopCode} section="interviewpilot" label="Interview Copilot" />
                <NavigationLink icon={faChartLine} section="skilldevelopment" label="AI Skill Development" />
                <NavigationLink icon={faNewspaper} section="resumebuilder" label="AI Resume Builder" />
                <NavigationLink icon={faSlidersH} section="assistant" label="Career Assistant" />
                <NavigationLink icon={faTh} section="question" label="Question Bank" />
              </ul>
            </nav>
          </div>
          <div>
            <ul>
              <h2 className="text-sm font-bold text-gray-600 ml-2 mb-4">Help</h2>
              <NavigationLink icon={faLifeRing} section="HelpcenterForm" label="Help Center" />
            </ul>
            <div className="relative flex items-center mb-6">
              <div className="w-14 h-14 bg-gray-300 rounded-full mr-3 cursor-pointer" onClick={toggleDropdown}>
                {/* User Profile Icon */}
              </div>
              <span className="font-semibold text-1xl cursor-pointer" onClick={toggleDropdown}>
                {userName}
              </span>
              {isDropdownOpen && (
                <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 shadow-lg rounded-md z-50">
                  <ul className="py-1">
                    <li>
                      <a
                        onClick={handleLogout}
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                      >
                        <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                        Logout
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={handleOpenSettings}
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                      >
                        <FontAwesomeIcon icon={faCog} className="mr-2" />
                        Settings
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <button
              className="w-full bg-btn-grad text-black bg-[length:200%] bg-left transition-bg duration-500 hover:bg-right rounded-full py-3"
              aria-label="Subscribe"
              onClick={() => handleSectionChange('pricing')}
            >
              Subscribe
            </button>
            {/* Removed theme toggle button */}
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
        <Suspense fallback={<div>Loading...</div>}>
          {activeSection === 'dashboard' && <div>Dashboard content here</div>}
          {activeSection === 'skilldevelopment' && <Skilldevelopment />}
          {activeSection === 'resumebuilder' && <Resumebuilder />}
          {activeSection === 'assistant' && <Assistant />}
          {activeSection === 'question' && <Question />}
          {activeSection === 'interviewpilot' && <Interviewpilot />}
          {activeSection === 'pricing' && <PricingPlans />}
          {activeSection === 'HelpcenterForm' && <HelpcenterForm />}
        </Suspense>
      </main>

      {/* Settings Modal */}
      <Modal isOpen={isSettingsOpen} onClose={handleCloseSettings}>
        <Suspense fallback={<div>Loading...</div>}>
          <Settings />
        </Suspense>
      </Modal>
    </div>
  );
};

export default Dashboard;
