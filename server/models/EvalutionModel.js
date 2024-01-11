
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const evalutionSchema = new Schema({
 studentId: {
    type: String,
    required: true,
  },
  courseId: {
    type: String,
    required: true,
  },
  instructorId: {
    type: String,
    required: true,
    },
    value:{
    type: String,
    required: true,
  }
});
// static evaluate method
evalutionSchema.statics.evaluate = async function (
  studentId,
      courseId,
      instructorId,
      value
) {
 
  const evalution = await this.create({
     studentId,
      courseId,
      instructorId,
      value
  });
  return evalution;
};


// static method to retrieve all Evalution Values
evalutionSchema.statics.getAllEvalutionValues = async function (courseId,
  instructorId) {
  const evalutionresult = await this.distinct("value",{
    courseId,
    instructorId,
  });
  return evalutionresult;
};
module.exports = mongoose.model("Evalution", evalutionSchema);
