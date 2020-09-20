const express = require('express');
const webQuizController = require('./../controllers/webQuizController');

const router = express.Router();

router.get('/', webQuizController.getWebQuizzes);
router.get('/:id', webQuizController.getSingleWebQuiz);
router.get('/:id/web-quiz-data', webQuizController.getWebQuizData);

module.exports = router;