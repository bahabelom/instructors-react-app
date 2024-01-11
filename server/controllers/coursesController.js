const Course = require("../models/courseModel");
const Instrucor = require('../models/instructorModel');

//  get courses
const getCourses = async (req, res) => {

  try {
    const courses = await Course.readAll();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }

};

//  get courses
const assignCourses = async (req, res) => {
  
const { instructorId, courseId, sectionId } = req.body;
console.log("Received request to assign courses:", instructorId, courseId, sectionId);
  
  try {
    
    // Update the section in the Instructor collection
    const updatedInstructor = await Instrucor.updateInstructorSection(instructorId, sectionId);
    // Update the instructor ID in the Course collection
    const updatedCourse = await Course.updateCourseInstructor(courseId, instructorId);
   
    // Send a response with the updated instructor and course
    res.status(200).json({
      message: 'Assigned successfully',
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }

};



module.exports = {
  getCourses,
  assignCourses
};
