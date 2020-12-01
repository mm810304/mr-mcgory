const path = require('path');
const Science = require('../models/Science');

exports.getScienceLessons = async (req, res, next) => {
    const lessons = await Science.find({});

    res.render('./pages/category', {
        lessons,
        category: 'Science Demo and Activities',
        description: 'Online activities for learning science'
    });
};

exports.getSingleLesson = async (req, res, next) => {
    const slugName = req.params.slug;
    const singleActivity = await Science.find({slug: slugName});
    const activity = singleActivity[0];
    if (activity.type === 'physics-demo') {
        res.render('./pages/demo', {
            activity,
            slug: activity.slug
        });
    } else if (activity.type === 'visual') {
        res.render('./pages/dataVisual', {
            activity
        });
    }
};

exports.getDemoName = async (req, res, next) => {
    const slugName = req.params.slug;
    const demoData = await Science.find({slug: slugName}).select('filename');
    const demoName = demoData[0];

    res.json(demoName);
};