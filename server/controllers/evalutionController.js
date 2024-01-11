const Evalution = require("../models/EvalutionModel");


//  login user
const evaluateInstructor = async (req, res) => {
try {
       // Extract data from the request body
    const { studentId, courseId, instructorId, value } = req.body;
    // Step 1: Create evalution value in the evalution collection
    const evalution = await Evalution.evaluate(studentId,courseId, instructorId, value);
    res.json({ success: true, message: 'Data inserted successfully.' });
  } catch (error) {
    console.error('Error inserting data into the database:', error);
    res.status(500).json({ error: 'Error inserting data into the database.' });
  }
};

// View Result
const viewResult = async (req, res) => {
  try {
    // Extract data from the request body
    const { courseId, instructorId } = req.body;

    // Step 1: Retrieve all student IDs
    const evalutionresult = await Evalution.getAllEvalutionValues(courseId, instructorId);
    // Step 2: Convert student IDs to decimal values (assuming they are numeric)
    const evalutionvalues = evalutionresult.map(value => parseFloat(value));
    // Step 3: Display decimal values in the console
    console.log("Decimal Values:", evalutionvalues);
    res.json({ success: true, evalutionvalues });
  } catch (error) {
    console.error('Error retrieving data from the database:', error);
    res.status(500).json({ error: 'Error retrieving data from the database.' });
  }
};
module.exports = {
  evaluateInstructor,
   viewResult,
};
