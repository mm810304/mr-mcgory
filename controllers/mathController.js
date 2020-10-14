const Math = require('../models/Math');

exports.getMathLessons = async (req, res, next) => {
    const mathLessons = await Math.find({});

    res.render('./pages/category', {
        lessons: mathLessons,
        category: 'Math',
        description: 'Practice your math skills with different games, challenges, and exercises.'
    })
};

exports.getSingleMathLesson = async (req, res, next) => {
    const id = req.params.id;
    const mathLesson = await Math.findById(id).select('_id title equations');

    res.render('./pages/math-speed-challenge', {
        id: mathLesson._id,
        title: mathLesson.title,
        equations: mathLesson.equations
    });
};

exports.getEquations = async (req, res, next) => {
    const id = req.params.id;
    const equations = await Math.findById(id).select('equations');

    res.json(equations);
};
