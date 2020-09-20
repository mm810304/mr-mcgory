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
    const id = req.params.id;
    const activity = await Science.findById(id);

    if (activity.type === 'physics-demo') {
        res.render('./pages/demo', {
            activity
        });
    }
};

exports.getDemoName = async (req, res, next) => {
    const id = req.params.id;
    const demoName = await Science.findById(id).select('filename');

    res.json(demoName);
};