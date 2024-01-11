const express = require("express");
const {
  getInstructors
} = require("../controllers/instructorController");

const requireAuth = require('../middleware/requireAuth');

const router = express.Router();
router.use(requireAuth)
// login route
router.get("/getinstructors", getInstructors);

module.exports = router;
