const path = require('path');
const SocialMedia = require('../models/SocialMedia');

exports.getSocialMediaLessons = async (req, res, next) => {
    const lessons = await SocialMedia.find({});

    res.render('./pages/category', {
        lessons,
        category: 'Social Media (Just Science)',
        description: 'Only the good parts of social media...the science parts!'
    })
};

exports.getSingleLesson = async (req, res, next) => {
    const slugName = req.params.slug;
    const lessonData = await SocialMedia.find({ slug: slugName});
    const lesson = lessonData[0];

    res.render('./pages/socialTwitter', {
        lesson
    })
}