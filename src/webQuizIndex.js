import '@babel/polyfill';

const questionText = document.getElementById('question-text');
const textInput = document.getElementById('text-input');
const answerResult = document.getElementById('answer-result');
const correctAnswerEl = document.getElementById('correct-answer');
const correctAnswerHeadingEl = document.getElementById('correct-answer-heading');

const checkAnswerBtn = document.getElementById('check-answer-btn');
const skipQuestionBtn = document.getElementById('skip-question-btn');
const nextQuestionBtn = document.getElementById('next-question-btn');
const retakeQuizBtn = document.getElementById('retake-quiz-btn');
const returnQuizPageBtn = document.getElementById('return-quiz-page-btn');

let questions = [];
let questionIndex = -1;
let currentQuestion = {};
let tracker;
let hasAnswered = false;

const positiveFeedback = ['That is right!  You genius, you!', 'Woah!  You killed that question!', 'Boom.  Nailed it!', 'You are so smart!  You must have a great teacher!', 'Somebody was paying attention in class!', 'Just great work.  There is nothing more to say.', 'Mr. McGory is proud of you.  And you should appreciate that.'];
const negativeFeedback = ['No. No. No.', 'Come on!  Were you paying attention in class?', 'What happened?  That is not right.', 'Hmmmm...That does not seem correct.', 'Mr. McGory is shaking his head in disappointment'];

//Will need to pass in id as parameter and get id of quiz from window.location.pathname.replace('/.....', ''); to get right data
const id = window.location.pathname.replace('/web-development/', '');

async function getQuestionData(id) {
    
    const res = await fetch(`https://mrmcgory.com/web-development/${id}/web-quiz-data`, {
        headers: {
            Accept: 'application/json'
        }
    });

    const data = await res.json();

    questions = data.quizData.map(item => {
        const formattedQuestion = {
            question: item.question,
            type: item.type,
            answer: item.answer,
            status: 'incomplete'
        };
        return formattedQuestion;
    });

    startQuiz();
}

function startQuiz() {
    getNewQuestion();
}

function getNewQuestion() {    
    if (questionIndex >= questions.length - 1) {
        questionIndex = 0
    } else {
        questionIndex++;
    }

    currentQuestion = questions[questionIndex];
   

    if (currentQuestion.status === 'complete') {
        getNewQuestion();
    }

    textInput.disabled = false;
    hasAnswered = false;
    resetStyle();
    setCurrentTracker();
    showQuestion(currentQuestion);
}

function showQuestion(q) {
    questionText.innerText = q.question;
}

function resetStyle() {
    nextQuestionBtn.hidden = true;
    checkAnswerBtn.hidden = false;
    skipQuestionBtn.hidden = false;
    textInput.value = '';
    answerResult.textContent = '';
    correctAnswerEl.textContent = '';
    correctAnswerHeadingEl.hidden = true;
}

function setCurrentTracker() {
    tracker = document.querySelector(`#tracker${questionIndex + 1}`);
    tracker.style.color = 'blue';
}

function setRightAnswer() {
    currentQuestion.status = 'complete';

    checkAnswerBtn.hidden = true;
    skipQuestionBtn.hidden = true;
    nextQuestionBtn.hidden = false;

    const randNum = Math.floor(Math.random() * positiveFeedback.length);
    answerResult.style.color = 'var(--right-answer)';
    answerResult.textContent = positiveFeedback[randNum];

    tracker = document.querySelector(`#tracker${questionIndex + 1}`);
    tracker.style.color = 'var(--right-answer)';

    const unfinished = questions.filter(q => q.status === 'incomplete');
    if (unfinished.length === 0) {
        endQuiz();
    }
}

function setWrongAnswer() {
    checkAnswerBtn.hidden = true;
    skipQuestionBtn.hidden = true;
    nextQuestionBtn.hidden = false;

    const randNum = Math.floor(Math.random() * negativeFeedback.length);
    answerResult.textContent = negativeFeedback[randNum];

    correctAnswerHeadingEl.hidden = false;
    answerResult.style.color = 'var(--wrong-answer)';
    correctAnswerEl.textContent = currentQuestion.answer;

    tracker = document.querySelector(`#tracker${questionIndex + 1}`);
    tracker.style.color = 'var(--wrong-answer)';
}

function endQuiz() {
    questionText.textContent = 'Nice Work!  Now what?'
    questionText.style.textAlign = 'center';
    textInput.hidden = true;

    checkAnswerBtn.hidden = true;
    skipQuestionBtn.hidden = true;
    nextQuestionBtn.hidden = true;
    retakeQuizBtn.hidden = false;
    returnQuizPageBtn.hidden = false;

}

//Handlers for Event Listeners
function getTextInput() {
    const userAnswer = textInput.value;
    checkAnswer(userAnswer);
}

function checkAnswer(userAnswer) {
    textInput.disabled = true;
    if (userAnswer === currentQuestion.answer) {
        setRightAnswer();
    } else {
        setWrongAnswer();
    }
}

function handleSkipQuestion() {
    tracker = document.querySelector(`#tracker${questionIndex + 1}`);
    tracker.style.color = 'red';
    getNewQuestion();
}

function handleRetakeQuiz() {
    window.location.reload();
}

getQuestionData(id);

//Event Listeners
checkAnswerBtn.addEventListener('click', getTextInput);

textInput.addEventListener('keyup', event => {
    if (event.keyCode === 13 && hasAnswered === false) {
       checkAnswerBtn.click();
       hasAnswered = true;
       textInput.disabled = true;
    }
});

nextQuestionBtn.addEventListener('click', getNewQuestion);
skipQuestionBtn.addEventListener('click', handleSkipQuestion);
retakeQuizBtn.addEventListener('click', handleRetakeQuiz);
returnQuizPageBtn.addEventListener('click', () => location.href = 'pizza.html');

