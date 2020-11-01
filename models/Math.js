const mongoose = require('mongoose');

const mathSchema = new mongoose.Schema({
    category: String,
    quizType: String,
    subject: {
        type: String,
        default: 'Math'
    },
    title: String,
    filename: String,
    description: String,
    level: String,
    url: String,
    image: {
        type: String,
        default: 'calculator.svg'
    }
});

const Math = mongoose.model('mathlessons', mathSchema);

module.exports = Math;