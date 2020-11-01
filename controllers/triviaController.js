const TriviaQuiz = require('../models/Trivia');

exports.startTrivia = async (req, res, next) => {
    const triviaInfo = await TriviaQuiz.find({});

    res.render('./pages/trivia', {
        title: 'Science Trivia - Mr. McGory',
        description: 'Are you a science champ or noob?',
        triviaInfo
    });
};