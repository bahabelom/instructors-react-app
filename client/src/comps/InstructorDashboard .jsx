import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InstructorDashboard = () => {
    
  const [questions] = useState([
    'How would you rate the clarity of the instructor?',
    'Did the instructor provide helpful feedback?',
    'Was the instructor accessible outside of class?',
    // Add more questions as needed
  ]);

  const [selectedCourse, setSelectedCourse] = useState('');
  const [evaluationValues, setEvaluationValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [studentEvaluations, setStudentEvaluations] = useState([]);
  const [error, setError] = useState('');
  const [evaluationData,setEvaluationData]=useState([
    'Your Value is 0',
    
  ])

  useEffect(() => {
    // Fetch instructor's own evaluated values from students
    fetchInstructorEvaluations();
  }, []);
  
  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
    // Fetch evaluation values for the selected course
    fetchEvaluationValues(e.target.value);
  };

  const fetchEvaluationData = (e) => {
    // Append a new item to the existing evaluationData array (assuming it's an array)
  setEvaluationData((evaluationData) => [
    ...evaluationData,
    { question: 'Your Value is 789', answer: '' }, // Assuming a question-answer structure
  ]);
    // Fetch evaluation values for the selected course
    fetchEvaluationValues(e.target.value);
  };

  const fetchEvaluationValues = async (courseId) => {
    try {
      const response = await axios.get(`/api/evaluation/${courseId}`);
      setEvaluationValues(response.data);
    } catch (error) {
      console.error('Error fetching evaluation values:', error);
    }
  };

  const fetchInstructorEvaluations = async () => {
    try {
      const response = await axios.get('/api/instructor/evaluations');
      setStudentEvaluations(response.data);
    } catch (error) {
      console.error('Error fetching instructor evaluations:', error);
      setError('Error fetching evaluations. Please try again later.');
    }
  };

  const handleSubmit = async () => {
    // Submit the instructor's answers to the server
    try {
      await axios.post('/api/evaluation/submit', {
        course: selectedCourse,
        answers: evaluationValues,
      });
      setSubmitted(true);
      // Refresh instructor's own evaluations after submission
      fetchInstructorEvaluations();
    } catch (error) {
      console.error('Error submitting evaluation:', error);
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-4">Instructor Evaluation</h1>



      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2" htmlFor="course">
          Select Course:
        </label>
        <select
          id="course"
          className="w-full p-2 border border-gray-300 rounded-md"
          value={selectedCourse}
          onChange={handleCourseChange}
        >
          <option value="" disabled>
            Select a Course
          </option>
          <option value="course1">Course 1</option>
          <option value="course2">Course 2</option>
          {/* Add more courses as needed */}
        </select>
      </div>

      {selectedCourse && (
        <>
          <h2 className="text-xl font-semibold mb-4">Evaluation Questions:</h2>
          <ul className="list-disc pl-6 mb-6">
            {questions.map((question, index) => (
              <li key={index} className="mb-2">
                {question}
              </li>
            ))}
          </ul>

          <h2 className="text-xl font-semibold mb-4">Your Ratings:</h2>
          <div className="grid grid-cols-2 gap-4">
            {questions.map((question, index) => (
              <div key={index}>
                <label className="block text-sm font-semibold mb-2">
                  {question}
                </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={evaluationValues[question] || ''}
                  onChange={(e) =>
                    setEvaluationValues((prevValues) => ({
                      ...prevValues,
                      [question]: parseInt(e.target.value, 10),
                    }))
                  }
                  className="w-16 p-2 border border-gray-300 rounded-md"
                />
              </div>
            ))}
          </div>

          <div className="container mx-auto mt-10">
  <>
    <h2 className="text-xl font-semibold mb-4">Evaluation Details:</h2>
    <div className="evaluation-details">
      {/* Initially show a button to view results */}
      {!evaluationData && (
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          onClick={fetchEvaluationData}
        >
          View Evaluation Results
        </button>
      )}

      {/* Once data is fetched, display the results */}
      {evaluationData && (
        <>
          {/* Structure the evaluation results using appropriate JSX elements */}
          <ul>
            {Object.entries(evaluationData).map(([question, answer]) => (
              <li key={question}>
                {question}: {answer}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  </>
</div>



          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 mt-6"
            onClick={handleSubmit}
          >
            {submitted ? 'Submitted' : 'Submit Evaluation'}
          </button>

        </>
      )}

      {studentEvaluations.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mt-8 mb-4">
            Student Evaluations for Your Courses:
          </h2>
          <ul>
            {studentEvaluations.map((evaluation, index) => (
              <li key={index} className="mb-2">
                <strong>Course: {evaluation.course}</strong>
                <ul>
                  {Object.entries(evaluation.answers).map(([question, answer]) => (
                    <li key={question}>
                      {question}: {answer}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </>
      )}

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default InstructorDashboard;
