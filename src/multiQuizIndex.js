import '@babel/polyfill';

import { renderLoader, clearLoader } from './utils/loader.js';
import { positiveFeedback, negativeFeedback } from './utils/comments';
import { randomNumber } from './utils/randomNumber';

const question = document.querySelector('#question');
const quizContainer = document.querySelector('.quiz-container');
const quiz = document.querySelector('.quiz');
const answerButtons = Array.from(document.querySelectorAll('input[type="radio"]'));
const answerOneText = document.querySelector('#option1-text');
const answerTwoText = document.querySelector('#option2-text');
const answerThreeText = document.querySelector('#option3-text');
const answerFourText = document.querySelector('#option4-text');

const nextQuestionButton = document.querySelector('#next-question-btn');
const checkAnswerButton = document.querySelector('#check-answer-btn');
const retakeQuizButton = document.querySelector('#retake-quiz-btn');
const quizHomeButton = document.querySelector('#quiz-home-btn');
const rightWrongText = document.querySelector('.check-answer-response__text');

const slugName = window.location.pathname.replace('/quizzes/', '');

let currentQuestion = {};
let availableQuestions = [];
let questionIndex = -1;
let tracker;

let questions = [];

async function getQuestionData(slugName) {
    renderLoader(quizContainer);
    const response = await fetch(`https://mrmcgory.com/quizzes/${slugName}/quiz-data`, {
        headers: {
            Accept: 'application/json'
        }
    });

    console.log(positiveFeedback, negativeFeedback);

    const quizData = await response.json();

    questions = quizData.questions.map(item => {
        const formattedQuestion = {
            question: item.question,
            correctAnswer: item.correctAnswer,
            status: 'incomplete'
        };
        
        const answerOptions = [...item.incorrectAnswers, item.correctAnswer].sort(() => Math.random() - .5); 

        answerOptions.forEach((option, index) => {
            formattedQuestion["option" + (index + 1)] = option;
        });

        return formattedQuestion;
    });
    
    startGame();
};

function startGame() {
    availableQuestions = [...questions];
    getNewQuestion();
    clearLoader();
    quiz.classList.remove('hidden');
};

function getNewQuestion() {
    if (questionIndex >= availableQuestions.length - 1) {
        questionIndex = 0;
    } else {
        questionIndex++;
    }

    currentQuestion = availableQuestions[questionIndex];

    if (currentQuestion.status === 'complete') {
        getNewQuestion();
    }

    answerButtons.forEach(button => button.disabled = false);

    resetStyle();
    setCurrentTracker(questionIndex);
    setQuestion(currentQuestion);
}

function setQuestion(q) {
    question.innerText = q.question;
    answerOneText.innerHTML = q.option1;
    answerTwoText.innerHTML = q.option2;
    answerThreeText.innerHTML = q.option3;
    answerFourText.innerHTML = q.option4;
    
};

function checkAnswer() {  
    const answerEl = answerButtons.find(button => button.checked);
    const userAnswer = answerEl.nextElementSibling.children[1].innerText;
    const correctAnswer = currentQuestion.correctAnswer.toString();

    if (userAnswer === correctAnswer) {
        setRightAnswer();
    } else if (userAnswer !== correctAnswer) {
        wrongAnswer();
    }

    answerButtons.forEach(button => button.disabled = true);

    
    const unfinished = availableQuestions.filter(q => q.status === 'incomplete');

    if (unfinished.length === 0) {
        nextQuestionButton.classList.add('hidden');
        retakeQuizButton.classList.remove('hidden');
        quizHomeButton.classList.remove('hidden');
        endQuiz();
        return;
    }

    checkAnswerButton.classList.add('hidden');
    nextQuestionButton.classList.remove('hidden');
};

function setCurrentTracker() {
    tracker = document.querySelector(`#number${questionIndex + 1}`);
    tracker.style.backgroundColor = 'var(--current-item2)';
};

function setRightAnswer() {
    answerButtons.forEach(button => {
        if (button.checked) {
            button.nextElementSibling.classList.add('highlight-right');
        }
    });
    tracker = document.querySelector(`#number${questionIndex + 1}`);
    tracker.style.backgroundColor = 'var(--right-answer)';
    currentQuestion.status = 'complete';

    const randNum = randomNumber(positiveFeedback.length - 1);
    rightWrongText.innerText = positiveFeedback[randNum];
};

function wrongAnswer() {
    answerButtons.forEach(button => {
        if (button.checked) {
            button.nextElementSibling.classList.add('highlight-wrong');
        }
    });
    tracker = document.querySelector(`#number${questionIndex + 1}`);
    tracker.style.backgroundColor = 'var(--wrong-answer)';

    const randNum = randomNumber(negativeFeedback.length - 1);
    rightWrongText.innerText = negativeFeedback[randNum];
};

function endQuiz() {
    rightWrongText.innerHTML = 'Nice Work!';
    nextQuestionButton.classList.add('hidden');
    checkAnswerButton.classList.add('hidden');
};

//Handlers for Event Listeners

function resetStyle() {
    resetAnswerButtons();
    unselectAnswer();
    resetRadioButtons();
    rightWrongText.innerText = '';
    nextQuestionButton.classList.add('hidden');
    checkAnswerButton.classList.remove('hidden');
};

function resetRadioButtons() {
    answerButtons.forEach(radio => radio.checked = false);
};

function unselectAnswer() {
    answerButtons.forEach(button => {
        if (button.checked) {
            button.nextElementSibling.classList.remove('highlight-right');
            return;
        }
    });
    answerButtons.forEach(button => {
        if (button.checked) {
            button.nextElementSibling.classList.remove('highlight-wrong');
        }
    });
}

function resetAnswerButtons() {
    answerButtons.forEach(button => {
        button.nextElementSibling.classList.remove('highlight__quiz-answer');
    });
};

function highlightSelectedAnswer(event) {
    event.target.nextElementSibling.classList.add('highlight__quiz-answer');
};

//Event Listeners
answerButtons.forEach(button => {
    button.addEventListener('change', (event) => {
        resetAnswerButtons(event);
        highlightSelectedAnswer(event);
    });
});

checkAnswerButton.addEventListener('click', checkAnswer);

nextQuestionButton.addEventListener('click', getNewQuestion);

retakeQuizButton.addEventListener('click', () => {
    location.reload(true);
});

getQuestionData(slugName);
