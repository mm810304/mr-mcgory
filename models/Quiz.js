const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    category: String,
    quizType: String,
    subject: {
        type: String,
        default: 'Science'
    },
    title: String,
    description: String,
    url: String,
    image: {
        type: String,
        default: 'quiz.svg'
    },
    level: String,
    questionsAndAnswers: Array
});

const Quiz = mongoose.model('quizzes', quizSchema);

module.exports = Quiz;