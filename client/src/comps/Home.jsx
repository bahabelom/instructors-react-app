import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // TODO: Implement login logic here

    // If the login is successful, navigate to the home page
    navigate('/evaluation_page');
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <header className="bg-blue-500 text-white text-center py-4">
        <h1 className="text-3xl font-bold">Welcome to University Evaluation System</h1>
        
      </header>

      <section className="flex-1 flex flex-col items-center justify-center">
        <p className="text-center text-gray-800 text-lg mb-4">
          Explore the features of our Instructor Evaluation System.
        </p>
        <div className="grid rounded-lg shadow-md bg-white p-8 w-full max-w-md">
          <h1 className="text-center text-3xl font-bold mb-4">Instructor Evaluation System</h1>
          <p className="text-center text-gray-500">
            This system allows students to evaluate their instructors and provide feedback.
          </p>
          <div className="flex flex-col justify-center items-center mt-8">
            <button
              className="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleSubmit}
            >
              Evaluate Your Instructors
            </button>
            <button className="w-full bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded mt-4">
              View Evaluation Results
            </button>
          </div>
        </div>
      </section>
      <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          {/* Replace these links and icons with actual social media links and icons */}
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook text-2xl"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter text-2xl"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram text-2xl"></i>
          </a>
          {/* Add more social media icons as needed */}
        </div>

        <div className="flex space-x-4">
          <a href="/about-us">About Us</a>
          <a href="/contact-us">Contact Us</a>
        </div>
      </div>
    </footer>
    </div>
  );
};
export default Home;
