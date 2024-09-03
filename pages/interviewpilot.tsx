import React, { useState } from 'react';
import '../app/globals.css';

const Interviewpilot = () => {
  const [activeTab, setActiveTab] = useState('oncoming'); // State to manage the active tab

  // Handler to switch tabs
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Sample data for the table
  const interviews = {
    oncoming: [], // Replace with dynamic data
    completed: [] // Replace with dynamic data
  };

  return (
    <div className="min-h-screen text-gray-900">
      <div className="min-h-screen p-2">
        <div className="max-w-7xl mx-auto mb-2 p-6 rounded-lg">
          {/* Header */}
          <h1 className="text-2xl font-semibold text-gray-900">Interviews</h1>
          <p className="text-gray-600">Develop a diverse range of interview techniques tailored to various fields, then thoroughly analyze expert insights and evaluations.</p>
          
          {/* Tabs */}
          <div className="space-x-2 mt-6">
            <button className="py-2 px-4 bg-gray-100 text-black border-2 border-black rounded-lg">
              Create Interview
            </button>
          </div>

          {/* Filter and Action Buttons */}
          <div className="mt-6 flex items-center justify-between">
            <div className="flex">
              <button
                className={`py-2 px-4 rounded-l-lg focus:outline-none ${activeTab === 'oncoming' ? 'bg-gray-300 text-black' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => handleTabClick('oncoming')}
              >
                Oncoming
              </button>
              <button
                className={`py-2 px-4 rounded-r-lg focus:outline-none ${activeTab === 'completed' ? 'bg-gray-300 text-black' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => handleTabClick('completed')}
              >
                Completed
              </button>
            </div>
            <div className="space-x-2">
              <button className="py-3 px-6 bg-gray-200 text-black rounded-full border-2 border-black text-black border-black rounded-lg">
                Get Started
              </button>
            </div>
          </div>

          {/* Interview List */}
          <table className="w-full mt-6 border-gray-300 border-collapse">
            <thead>
              <tr className="text-left text-black-500 bg-gray-100 border-gray-200">
                <th className="py-2 px-4 border-gray-300">Company</th>
                <th className="py-2 px-4 border-gray-300">Role</th>
                <th className="py-2 px-4 border-gray-300">Type</th>
                <th className="py-2 px-4 border-gray-300">Duration</th>
                <th className="py-2 px-4 border-gray-300">Date</th>
                <th className="py-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {interviews[activeTab].length === 0 ? (
                <tr>
                  <td className="py-4 text-center text-gray-400" colSpan={6}>
                    {activeTab === 'oncoming' ? 'No upcoming interviews' : 'No completed interviews'}
                  </td>
                </tr>
              ) : (
                // Render dynamic interview data here
                interviews[activeTab].map((interview, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-gray-300">{interview.company}</td>
                    <td className="py-2 px-4 border-gray-300">{interview.role}</td>
                    <td className="py-2 px-4 border-gray-300">{interview.type}</td>
                    <td className="py-2 px-4 border-gray-300">{interview.duration}</td>
                    <td className="py-2 px-4 border-gray-300">{interview.date}</td>
                    <td className="py-2 px-4">
                      {/* Add action buttons or links here */}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Interviewpilot;
