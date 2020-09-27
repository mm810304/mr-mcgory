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
    const id = req.params.id;
    const quiz = await Quiz.findById(id).select('_id title questionsAndAnswers');

    res.render('./pages/multiQuiz', {
        id: quiz._id,
        title: quiz.title,
        questions: quiz.questionsAndAnswers
    });

}

exports.getQuizData = async (req, res, next) => {
    const id = req.params.id;
    const quizData = await Quiz.findById(id).select('questionsAndAnswers');

    res.json(quizData);
}





