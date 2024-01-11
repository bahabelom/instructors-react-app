import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';

const Evalutionpage = () => {
  const [responses, setResponses] = useState(Array(5).fill(''));
  const [average, setAverage] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { user } = useAuthContext();

  const handleChange = (index, value) => {
    const newResponses = [...responses];
    newResponses[index] = value;
    setResponses(newResponses);
  };

  const calculateAverage = () => {
    const numericResponses = responses.map(Number);
    const sum = numericResponses.reduce((acc, value) => acc + value, 0);
    const avg = sum / numericResponses.length;
    setAverage(avg);

    console.log(user.email);
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!user) {
        return <h1>Login First</h1>
      }

      try {
  
        const response = await axios.get("http://localhost:4000/api/questions/readquestion",{
          
          headers: {
            Authorization: `Bearer ${user.token}`, // Include the user token
          },
        });
       
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [user]);


  const handlePrev = () => {
    setCurrentQuestion((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentQuestion((prev) => Math.min(prev + 1, questions.length - 1));
    setResponses(Array(5).fill('')); // Reset selected radio buttons
  };
  // http://localhost:4000/api/evalution/evalute
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-xl bg-white p-8 rounded-md shadow-md">
       {user ? (
            <p>Welcome, {user.name}!</p>
            ) : (
            <p>Please log in to see your profile.</p>
          )}
        <h1 className="text-3xl font-bold mb-4">Questionnaire</h1>
        {questions.length > 0 && (
          <div className="mb-6">
            <p className="font-bold text-lg mb-2">{questions[currentQuestion].question_text}</p>
            <div className="flex flex-wrap gap-4">
              {[1, 2, 3, 4, 5].map((value) => (
                <div key={value} className="flex items-center">
                  <input
                    type="radio"
                    id={`question-${currentQuestion + 1}-${value}`}
                    name={`question-${currentQuestion + 1}`}
                    value={value}
                    onChange={() => handleChange(currentQuestion, value)}
                    checked={parseInt(responses[currentQuestion]) === value}
                    className="mr-2 transition-transform duration-300 transform hover:scale-110"
                  />
                  <label htmlFor={`question-${currentQuestion + 1}-${value}`}>
                    {value === 1 && 'Very poor'}
                    {value === 2 && 'Poor'}
                    {value === 3 && 'Average'}
                    {value === 4 && 'Good'}
                    {value === 5 && 'Excellent'}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between">
          <button
            onClick={handlePrev}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700"
            disabled={currentQuestion === 0}
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            disabled={currentQuestion === questions.length - 1}
          >
            Next
          </button>
        </div>

        <button
          onClick={calculateAverage}
          className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          Calculate Average
        </button>

        {average !== null && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Average Value: {average}</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Evalutionpage;
