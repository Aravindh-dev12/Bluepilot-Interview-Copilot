import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';
import '../app/globals.css';

const HelpCenterForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ name, email, message });
    // You might want to clear the form or show a success message here
  };

  return (
    <div className="flex justify-between items-start max-w-5xl mx-auto p-4 mt-24">
      <div className="w-full max-w-lg">
        <h2 className="text-2xl text-center font-bold mb-4">How Can We Help You?</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="block w-full px-2 py-1 border-b border-gray-300 focus:outline-none focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full px-2 py-1 border-b border-gray-300 focus:outline-none focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={4}
              className="block w-full px-2 py-1 border-b border-gray-300 focus:outline-none focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="border-2 border-black bg-gray-100 text-black px-4 py-2 text-lg w-44 rounded-full hover:bg-gray-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className="flex flex-col items-center space-y-4 mt-20 ml-6">
        <h2 className="text-xl font-bold">Find Us Here</h2>
        <p>Get in touch with us using the following options</p>
        <div className="flex space-x-6">
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} className="text-3xl text-blue-700 hover:text-blue-800" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <span className="text-2xl">𝕏</span> {/* Adjust text size here */}
          </a>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faYoutube} className="text-3xl text-red-600 hover:text-red-700" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default HelpCenterForm;
