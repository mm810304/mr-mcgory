const express = require('express');
const quizController = require('./../controllers/quizController');

const router = express.Router();

router.get('/', quizController.getQuizzes);
router.get('/:id', quizController.getSingleQuiz);
router.get('/:id/quiz-data', quizController.getQuizData);

module.exports = router;