const express = require('express');
const mathController = require('../controllers/mathController');

const router = express.Router();

router.get('/', mathController.getMathLessons);
router.get('/:slug', mathController.getSingleMathLesson);
router.get('/:slug/equation-data', mathController.getEquations);
router.get('/:slug/math-speed-name', mathController.getMathSpeedName);

module.exports = router;