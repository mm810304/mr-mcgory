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
    const id = req.params.id;
    const webQuiz = await WebQuiz.findById(id).select('_id title');

    res.render('./pages/webQuiz', {
        id: webQuiz.id,
        title: webQuiz.title
    });
};

exports.getWebQuizData = async (req, res, next) => {
    const id = req.params.id;
    const quizData = await WebQuiz.findById(id).select('quizData');

    res.json(quizData);
};