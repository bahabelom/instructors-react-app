
// AdminDashboard.jsx
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import the Link component
import UserProfile from './UserProfile';
import { useAuthContext } from '../hooks/useAuthContext';
const AdminDashboard = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [instructors, setInstructors] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

const {user} = useAuthContext();
  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };
useEffect(() => {
    // Fetch instructors, courses, and sections data from your API
    const fetchData = async () => {
      try {
       
         // Fetch only instructors with role "teacher"
      const instructorsResponse = await axios.get('http://localhost:4000/api/users/getuser',{
      params: {
            role: 'teacher',
          },
        headers: {
          Authorization: `Bearer ${user.token}`, // Include the user token
        },
      });
         
        const coursesResponse = await axios.get('http://localhost:4000/api/course/getcourses' ,{
          
          headers: {
            Authorization: `Bearer ${user.token}`, // Include the user token
          },
        });
        setInstructors(instructorsResponse.data);
        setCourses(coursesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [user]);

  const handleAssign = async () => {
    
    try {
      // Make a POST request to assign the selected course and section to the instructor
      await axios.post('http://localhost:4000/api/course/assigncourses', {
        params:{
          instructorId: selectedInstructor,
          courseId: selectedCourse,
          sectionId: selectedSection,
        },
        headers: {
          Authorization: `Bearer ${user.token}`, // Include the user token
        },
      });
      
      
      // Update the success message
      setSuccessMessage('Assigned successfully');
      // Refresh the data after assigning
      const instructorsResponse = await axios.get('http://localhost:4000/api/instructor/getinstructors',{
        headers: {
          Authorization: `Bearer ${user.token}`, // Include the user token
        },
      });
      setInstructors(instructorsResponse.data);
      
      // Clear the selected values
      setSelectedInstructor('');
      setSelectedCourse('');
      setSelectedSection('');
    } catch (error) {
      console.error('Error assigning:', error);
    }
  };
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <ul>
          <li>
            <Link to="/">
               Dashboard
            </Link>
          </li>
          <li>
            <Link to="/profile-settings">
              Profile Settings
            </Link>
          </li>
          <li>
            <Link to="/tables">
             Tables
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      
       <div className="flex-1 p-4">
        {/* Header Section */}
        {/* Header Section */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold ">Main Content</h2>
        
         
        </div>

        {/* Add your main content here */}
        <div className="grid grid-cols-3 gap-8">
        <div className="col-span-1 bg-white p-6 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-4">Select Instructor:</h2>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            value={selectedInstructor}
            onChange={(e) => setSelectedInstructor(e.target.value)}
          >
            <option value="">
              Select an Instructor
            </option>
            {instructors.map((instructor) => (
              <option key={instructor._id} value={instructor._id}>
                {instructor.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-1 bg-white p-6 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-4">Select Course:</h2>
          <select 
            className="w-full p-2 border border-gray-300 rounded-md"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option  value="">
              Select a Course
            </option>
            {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.courseName}
            </option>
          ))}
          </select>
        </div>
        <div className="col-span-1 bg-white p-6 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-4">Sections</h2>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            onChange={(e) => setSelectedSection(e.target.value)}
          >
            <option value=""  selected>
              Select a Section
            </option>
            <option value="A"  >
               Section A
            </option>
            <option value="B"  >
               Section B
            </option>
            <option value="C"  >
               Section C
            </option>
            <option value="D"  >
               Section D
            </option>
          </select>
        </div>
      </div>
      <div className="mt-6">
      {successMessage && <p className="text-green-500">{successMessage}</p>}
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          onClick={handleAssign}
          disabled={!selectedInstructor || !selectedCourse || !selectedSection}
        >
          Assign
        </button>
      </div>
          <footer className="bg-gray-800 text-white p-4 pl-0 text-center text-xs font-semibold fixed bottom-0 w-full">
            <div className="flex justify-center space-x-4">
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/privacy">Privacy Policy</Link>
            </div>
            <p className="mt-4">&copy; {new Date().getFullYear()} Mekelle University</p>
          </footer>
      </div>

      {/* Profile Photo */}
      <div className="fixed top-0 right-0 m-4 cursor-pointer">
        <img
          src="../images/ba.jpg"
          alt="Profile"
          className="w-10 h-10 rounded-full"
          onClick={toggleProfile}
        />
      </div>
    

      {/* Profile Page Popup */}
      {isProfileOpen && <UserProfile onClose={toggleProfile} />}
    </div>
    
    
  );
};

export default AdminDashboard;
