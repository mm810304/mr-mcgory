const mongoose = require('mongoose');

const webQuizSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    description: String,
    category: String,
    url: String,
    image: {
        type: String,
        default: 'coding.svg'
    },
    level: String,
    slug: {
        type: String,
        unique: true
    },
    quizData: Array
});

const WebQuiz = mongoose.model('webquizzes', webQuizSchema);

module.exports = WebQuiz;