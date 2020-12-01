const mongoose = require('mongoose');

const scienceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'A title is needed']
    },
    filename: String,
    type: String,
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
    slug: {
        type: String,
        unique: true
    },
    data: {}
});

const Science = mongoose.model('activities', scienceSchema);

module.exports = Science;