const Question = require("../models/questionModel");



//  login user
const readQuestion = async (req, res) => {
try {
    const questions = await Question.readAll();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = {
  readQuestion
};
