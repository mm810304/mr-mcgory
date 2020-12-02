const express = require('express');
const webQuizController = require('./../controllers/webQuizController');

const router = express.Router();

router.get('/', webQuizController.getWebQuizzes);
router.get('/:slug', webQuizController.getSingleWebQuiz);
router.get('/:slug/web-quiz-data', webQuizController.getWebQuizData);

module.exports = router;