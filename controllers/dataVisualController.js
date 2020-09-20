const path = require('path');
const Visual = require('../models/DataVisuals');

exports.getDataVisualLessons = async (req, res, next) => {
    const lessons = await Visual.find({});

    res.render('./pages/category', {
        lessons,
        category: 'Data for Science',
        description: 'Data visualizations for learning about the world, space, people, and more'
    }); 
};

exports.getVisualLesson = async (req, res, next) => {
    const id = req.params.id;
    const visual = await Visual.findById(id);

    res.render('./pages/dataVisual', {
        visual
    })
};

exports.getVisualName = async (req, res, next) => {
    const id = req.params.id;
    const visualName = await Visual.findById(id).select('filename');

    res.json(visualName);
};