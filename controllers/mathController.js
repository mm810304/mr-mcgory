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
    const slugName = req.params.slug;
    const mathLessonData = await Math.find({slug: slugName}).select('_id title equations slug');
    const mathLesson = mathLessonData[0];

    res.render('./pages/math-speed-challenge', {
        id: mathLesson._id,
        title: mathLesson.title,
        equations: mathLesson.equations,
        slug: mathLesson.slug
    });
};

exports.getEquations = async (req, res, next) => {
    const slugName = req.params.slug;
    const equationsData = await Math.find({ slug: slugName }).select('equations');
    const equations = equationsData[0];
    console.log('equations', equations)

    res.json(equations);
};

exports.getMathSpeedName = async (req, res, next) => {
    const slugName = req.params.slug;
    const mathSpeedNameData = await Math.find({ slug: slugName }).select('filename');
    const mathSpeedName = mathSpeedNameData[0];
    console.log('math speed name', mathSpeedName);

    res.json(mathSpeedName);
}

