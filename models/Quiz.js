const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    category: String,
    quizType: String,
    subject: {
        type: String,
        default: 'Science'
    },
    title: String,
    level: String,
    description: String,
    url: String,
    questions: Array,
    image: {
        type: String,
        default: 'quiz.svg'
    }
});

const Quiz = mongoose.model('quizzes', quizSchema);

module.exports = Quiz;