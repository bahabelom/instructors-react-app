const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const instructorSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  phone_number: {
    type: Number,
    required: true,
  },
  section: {
    type: String,
  },
  year: {
    type: String,
  },
});
// static signup method
instructorSchema.statics.signup = async function (
   userId,
  phone_number,
  section,
  year,
) {
  const user = await this.create({  
     user: userId,
    phone_number,
    section,
    year,
    
  });
  return user;
};
// get all Instructors
instructorSchema.statics.readAll = async function () {
  try {
    const instructors = await this.find();
    return instructors;
  } catch (error) {
    throw new Error('Error fetching instructors:', error);
  }
};
// update Instructor Section
instructorSchema.statics.updateInstructorSection = async function (instructorId, selectedSection) {
  console.log("Received request to assign courses:", instructorId, selectedSection);
  
  try {
    const instructor = await this.findOneAndUpdate(
      { user: instructorId },
      { $set: { section: selectedSection } },
      { new: true }
    );
    if (!instructor) {
      throw new Error('Instructor not found');
    }
    return instructor;
  } catch (error) {
    console.error('Error updating instructor section:', error);
    throw new Error('Error updating instructor section');
  } 
};
module.exports = mongoose.model("Instructor", instructorSchema);
