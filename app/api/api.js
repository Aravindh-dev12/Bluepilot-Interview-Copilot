import axios from 'axios';

const API_URL = '127.0.0.1:27017/copilot'; // Replace with your backend URL

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Similarly, you can create functions for other API endpoints
