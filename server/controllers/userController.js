const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const Student = require("../models/studentModel")
const Instructor=require("../models/instructorModel")

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};
//  login user
const loginUser = async (req, res) => {
  
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const userbyemail = await User.getUserByEmail(email);
    // Directly access properties from the `user` object
    const name = user.name; // Get the name directly from the user object
    const role =user.role;
      //  const parsedData = JSON.parse(userbyemail);
      // // Access the first user object within the "userbyemail" array
      // const firstUser = parsedData.userbyemail[0];
      // // Extract the name from the first user object
      // const namebyemail = firstUser.name;
    const token = createToken(user._id);
    res.status(200).json({ name,email,role,token });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//  get user
const getUser = async (req, res) => {
  const { role } = req.query
  try {
    const user = await User.getUser({role});
    const token = createToken(user._id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//  get userby email
const getUserByEmail = async (req, res) => {
  const { email } = req.query
  try {
    const userbyemail = await User.getUserByEmail(email);
    res.status(200).json(userbyemail);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//SignUp user
const signUpUser = async (req, res) => {
  const { name, phone_number, section, year, email, password, role, status } = req.body;
  try {
    // Step 1: Create user in the User collection
    const user = await User.signup(name, email, password, role, status);
    // Get the user ID
   const userId=user._id
    // Step 2: Check user's role and create additional records
    if (role === "student") {
      console.log(userId);
      const student = await Student.signup(userId, phone_number, section, year);
      const token = createToken(student._id);
      res.status(200).json({ name,email,role, token });

    } else if (role === "teacher") {
      const instructor = await Instructor.signup(userId, phone_number, section, year);
      const token = createToken(userId);
      res.status(200).json({ name,email,role, token });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  loginUser,
  signUpUser,
  getUser
};
