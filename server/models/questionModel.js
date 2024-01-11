const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  question_text: {
    type: String,
    required: true,
  }
});

// Define a static method to fetch questions
questionSchema.statics.readAll = async function () {
  try {
    const questions = await this.find();
    return questions;
  } catch (error) {
    throw new Error('Error fetching questions:', error);
  }
};

module.exports = mongoose.model("Question", questionSchema);
