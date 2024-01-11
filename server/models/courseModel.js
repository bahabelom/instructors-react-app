const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  courseId
: {
    type: String,
    required: true,
  },
  instructorId:{
    type: String,
    required: true,
  },
  
credits:{
  type: String,
  required: true,
},
  course_name: {
    type: String,
    required: true,
  }
});

// Define a static method to fetch questions
courseSchema.statics.readAll = async function () {
  try {
    const courses = await this.find();
    return courses;
  } catch (error) {
    throw new Error('Error fetching courses:', error);
  }
};

courseSchema.statics.updateCourseInstructor = async function (courseId, selectedInstructorId) {
  console.log("Received request to assign courses:", courseId, selectedInstructorId);
  
  try {
    const course = await this.findOneAndUpdate(
     { courseId : courseId},
      { $set: { instructorId: selectedInstructorId } },
      { new: true }
    
    );
    if (!course) {
      throw new Error('Course not found');
    }
    return course;
  } catch (error) {
    throw new Error('Error updating course instructor:', error);
  }
};



module.exports = mongoose.model("Course", courseSchema);
