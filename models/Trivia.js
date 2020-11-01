const mongoose = require('mongoose');

const triviaSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    url: String,
    image: {
        type: String,
        default: 'quiz.svg'
    },
    allTriviaQuestions: Array
});

const TriviaQuiz = mongoose.model('triviaquizzes', triviaSchema);

module.exports = TriviaQuiz;

