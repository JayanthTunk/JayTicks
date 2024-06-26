import React from 'react';
import { Link } from 'react-router-dom';
import CustomGif from './assests/Data Collection.gif';

const IndexPage = () => {
  return (
    <div className="git  flex flex-col justify-center items-center bg-purple-100 text-purple-900">
      <div className="container mx-auto px-4 text-center flex-1 space-y-6">
        <h1 className="text-4xl font-bold">Welcome to JayTics!</h1>
        <p className="text-justify">
          Jaytics is a dedicated platform for Data Analytics designed to streamline the process of deriving insights from data. Our goal is to simplify and enhance the analytics experience, providing powerful tools and intuitive interfaces that empower users to uncover meaningful patterns and trends. Whether you're analyzing sales figures, customer behavior, or market trends, Jaytics offers robust features to support your data-driven decisions. Discover the power of analytics with Jaytics and transform your data into actionable insights effortlessly.
        </p>
        <h2 className="text-3xl font-bold">What is Data Analytics?</h2>
        <p className="text-justify">
          Data Analytics involves the process of examining raw data to draw conclusions about the information it contains, using techniques such as statistical analysis, machine learning, and data mining to uncover patterns, correlations, and trends.
        </p>
        <h2 className="text-3xl font-bold">Steps:</h2>
      </div>

      <div className="w-full flex justify-center items-center mb-6">
        <img src={CustomGif} alt="Data Collection" className="max-w-full h-auto md:max-w-1/4 animate-pulse" />
      </div>

      <div className="space-x-4 mt-6">
        <Link to="/login" className="px-4 py-2 bg-purple-500 text-white rounded">Login</Link>
        <Link to="/signup" className="px-4 py-2 bg-purple-500 text-white rounded">Sign Up</Link>
      </div>
    </div>
  );
};

export default IndexPage;
