const express = require('express');
const mathController = require('../controllers/mathController');

const router = express.Router();

router.get('/', mathController.getMathLessons);
router.get('/:id', mathController.getSingleMathLesson);
router.get('/:id/equation-data', mathController.getEquations);
router.get('/:id/math-speed-name', mathController.getMathSpeedName);

module.exports = router;