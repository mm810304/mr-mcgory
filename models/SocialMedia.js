const mongoose = require('mongoose');

const socialMediaSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'A title is needed']
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
        default: 'twitter.svg'
    },
    slug: {
        type: String,
        unique: true
    },
    link: String
});

const SocialMedia = mongoose.model('socialmedias', socialMediaSchema);

module.exports = SocialMedia;