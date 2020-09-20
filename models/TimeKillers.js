const mongoose = require('mongoose');

const timeKillerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'A title is needed']
    },
    name: {
        type: String,
        required: [true, 'A name is required for url purposes']
    },
    category: {
        type: String,
        required: [true, 'A category name is needed']
    },
    description: {
        type: String,
        required: [true, 'A description is needed']
    },
    url: {
        type: String,
        required: [true, 'A url is needed']
    },
    image: {
        type: String,
        default: 'default.svg'
    },
    data: {}
});

const TimeKillers = mongoose.model('timekillers', timeKillerSchema);

module.exports = TimeKillers;