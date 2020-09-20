const mongoose = require('mongoose');

const dataVisualSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'A title is needed']
    },
    filename: String,
    type: String,
    level: String,
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
        default: 'data/data-default.svg'
    },
    data: {}
});

const Visual = mongoose.model('visuals', dataVisualSchema);

module.exports = Visual;