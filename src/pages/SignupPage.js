import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Ensure this import is correct

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  // Use useNavigate hook to get the navigate function

  const handleSignUp = async (e) => {
    e.preventDefault();
  
    try {
      const { data } = await axios.post('http://localhost:5000/api/users/signup', { email, password });
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Signup failed:', error);
      if (error.response) {
        console.log('Server Error:', error.response.data);
      } else if (error.request) {
        console.log('Request Error:', error.request);
      } else {
        console.log('Unexpected Error:', error.message);
      }
    }
  };
  
  return (
    <div className="h-screen flex justify-center items-center bg-purple-100">
      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSignUp}>
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="w-full bg-purple-500 text-white py-2 rounded" type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;
