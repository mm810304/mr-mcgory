const express = require('express');
const quizController = require('./../controllers/quizController');

const router = express.Router();

router.get('/', quizController.getQuizzes);
router.get('/:slug', quizController.getSingleQuiz);
router.get('/:slug/quiz-data', quizController.getQuizData);

module.exports = router;