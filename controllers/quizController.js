const Quiz = require('../models/Quiz');

exports.getQuizzes = async (req, res, next) => {
    const quizzes = await Quiz.find({});

    res.render('./pages/category', {
        lessons: quizzes,
        category: 'Quizzes',
        description: 'Test your knowledge and see if you are prepared for your next test with these review quizzes.',
    });
};

exports.getSingleQuiz = async (req, res, next) => {
    const slugName = req.params.slug;
    const singleQuiz = await Quiz.find({slug: slugName});
    const quiz = singleQuiz[0];

    res.render('./pages/multiQuiz', {
        quiz,
        slug: quiz.slug,
        title: quiz.title,
        questions: quiz.questions
    });
}

exports.getQuizData = async (req, res, next) => {
    const slugName = req.params.slug;
    const quizRaw = await Quiz.find({slug: slugName}).select('questions');
    const quizData = quizRaw[0];

    res.json(quizData);
}





