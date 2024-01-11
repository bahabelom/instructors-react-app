const express = require("express");

const {
  getCourses,
  assignCourses,
} = require("../controllers/coursesController");

const requireAuth = require('../middleware/requireAuth');

const router = express.Router();
router.use(requireAuth)

// login route

router.get("/getcourses", getCourses);
router.post("/assigncourses", assignCourses);

module.exports = router;
