const express = require("express");
const {
  readQuestion
} = require("../controllers/questionController");

const requireAuth = require('../middleware/requireAuth');


const router = express.Router();
router.use(requireAuth)
// login route
router.get("/readquestion", readQuestion);

module.exports = router;
