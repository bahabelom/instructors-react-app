const express = require("express");
const {
  loginUser,
  signUpUser,
  getUser,
} = require("../controllers/userController");

 const requireAuth = require('../middleware/requireAuth');

const router = express.Router();
// login route
router.post("/login", loginUser);
// signupUser route
router.post("/signup", signUpUser);
// getUser route
router.use(requireAuth)
router.get("/getuser", getUser);

module.exports = router;
