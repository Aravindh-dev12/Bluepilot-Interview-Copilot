import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you use axios for HTTP requests

const Settings: React.FC = () => {
  const [displayName, setDisplayName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // Get the theme from localStorage or default to 'light'
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  });
  const [loading, setLoading] = useState<boolean>(false);

  // Apply the saved theme on initial render
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTheme = e.target.value as 'light' | 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); // Save theme to localStorage
    document.documentElement.classList.toggle('dark', newTheme === 'dark'); // Apply the theme
  };

  const handleProfileUpdate = async () => {
    setLoading(true);
    try {
      // Replace with your API endpoint
      await axios.put('/api/updateProfile', { displayName, email });
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen relative">
      <div className="absolute inset-0 bg-black opacity-50 blur-md z-10"></div>
      <div className="relative z-20 bg-white dark:bg-gray-800 p-6 rounded-md shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Profile Information</h2>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Display Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="border rounded-md p-2 w-full dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              placeholder="Enter your display name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded-md p-2 w-full dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              placeholder="Enter your email address"
            />
          </div>
          <button
            onClick={handleProfileUpdate}
            className={`bg-blue-500 text-white px-4 py-2 rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Theme Settings</h2>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Select Theme</label>
          <select
            value={theme}
            onChange={handleThemeChange}
            className="border rounded-md p-2 w-full dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Settings;
