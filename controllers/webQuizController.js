const WebQuiz = require('../models/WebQuiz');

exports.getWebQuizzes = async (req, res, next) => {
    const webQuizzes = await WebQuiz.find({});

    res.render('./pages/category', {
        lessons: webQuizzes,
        category: 'Web Development',
        description: 'Practice the fundamentals of web development'
    });
};

exports.getSingleWebQuiz = async (req, res, next) => {
    const slugName = req.params.slug;
    const webQuizData = await WebQuiz.find({ slug: slugName }).select('_id title');
    const webQuiz = webQuizData[0];

    res.render('./pages/webQuiz', {
        id: webQuiz.id,
        title: webQuiz.title,
        slug: webQuiz.slug
    });
};

exports.getWebQuizData = async (req, res, next) => {
    const slugName = req.params.slug;
    const quizDataArray = await WebQuiz.find({ slug: slugName }).select('quizData');
    const quizData = quizDataArray[0];

    res.json(quizData);
};