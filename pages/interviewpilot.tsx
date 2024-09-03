import React, { useState, useRef, useEffect } from 'react';
import Link from "next/link";
import '../app/globals.css';

const Interviewpilot = () => {
  const [activeTab, setActiveTab] = useState('oncoming');
  const [showModal, setShowModal] = useState(false);
  const [interviews, setInterviews] = useState({
    oncoming: [],
    completed: [],
  });
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    type: '',
    duration: '',
    durationUnit: 'minutes', // Default unit
    date: '',
  });
  const [dropdownIndex, setDropdownIndex] = useState(null); // State for managing dropdown visibility

  const dropdownRef = useRef(); // Reference for dropdown menu

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownIndex(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setInterviews({
      ...interviews,
      oncoming: [...interviews.oncoming, formData],
    });
    setShowModal(false);
    setFormData({ company: '', role: '', type: '', duration: '', durationUnit: 'minutes', date: '' });
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const toggleDropdown = (index) => {
    setDropdownIndex(dropdownIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen text-gray-900">
      <div className="min-h-screen p-2">
        <div className="max-w-7xl mx-auto mb-2 p-6 rounded-lg">
          <h1 className="text-2xl font-semibold text-gray-900">Interviews</h1>
          <p className="text-gray-600">
            Develop a diverse range of interview techniques tailored to various fields, then thoroughly analyze expert insights and evaluations.
          </p>

          <div className="space-x-2 mt-6">
            <button
              onClick={openModal}
              className="py-2 px-4 bg-gray-100 text-black border-2 border-black rounded-lg"
            >
              Create Interview
            </button>
          </div>

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
            <Link href="/Interview">
              <button className="py-3 px-6 bg-gray-200 text-black rounded-full border-2 border-black">
                Get Started
              </button>
              </Link>
            </div>
          </div>

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
                interviews[activeTab].map((interview, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-gray-300">{interview.company}</td>
                    <td className="py-2 px-4 border-gray-300">{interview.role}</td>
                    <td className="py-2 px-4 border-gray-300">{interview.type}</td>
                    <td className="py-2 px-4 border-gray-300">{interview.duration} {interview.durationUnit}</td>
                    <td className="py-2 px-4 border-gray-300">{interview.date}</td>
                    <td className="py-2 px-4">
                      <div className="relative inline-block text-left">
                        <button
                          onClick={() => toggleDropdown(index)}
                          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                          &#x22EE;
                        </button>
                        {dropdownIndex === index && (
                          <div
                            ref={dropdownRef}
                            className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                          >
                            <div className="py-1">
                              <button className="block px-4 py-2 text-sm text-gray-700">
                                Download
                              </button>
                              <button className="block px-4 py-2 text-sm text-gray-700">
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-2xl max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Create Interview</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Company</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Role</label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Type</label>
                <input
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4 flex items-center">
                <label className="block text-gray-700 mr-4">Duration</label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="w-3/4 px-4 py-2 border rounded-lg mr-2"
                  required
                />
                <select
                  name="durationUnit"
                  value={formData.durationUnit}
                  onChange={handleInputChange}
                  className="w-1/4 border px-4 py-2 rounded-lg"
                >
                  <option value="minutes">Minutes</option>
                  <option value="hours">Hours</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="py-2 px-4 bg-gray-200 text-black border-2 border-black rounded-lg mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 bg-gray-100 text-black border-2 border-black rounded-lg"
                >
                  Add Interview
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Interviewpilot;
