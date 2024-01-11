const Instructor = require("../models/instructorModel");

//  get courses
const getInstructors = async (req, res) => {

  try {
    const instructors = await Instructor.readAll();
    res.json(instructors);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }

};


// update instructor section
const updateInstructorSection = async (instructorId, selectedSection) => {
  try {
    const instructor = await Instructor.findByIdAndUpdate(
      instructorId,
      { section: selectedSection },
      { new: true }
    );

    if (!instructor) {
      throw new Error('Instructor not found');
    }

    return instructor;
  } catch (error) {
    throw new Error('Error updating instructor section:', error);
  }
};


module.exports = {
  getInstructors
};
