const express = require("express");
const {
   viewResult,
  evaluateInstructor,
 
} = require("../controllers/evalutionController");
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();
router.use(requireAuth)

router.post("/evalute", evaluateInstructor);
router.get("/view", viewResult);


module.exports = router;
