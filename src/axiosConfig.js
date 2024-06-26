import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // Ensure this matches your backend server URL
  timeout: 10000, // Adjust timeout as necessary
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
