import '@babel/polyfill';

const triviaSetupDisplay = document.getElementById('trivia-setup-display');
const triviaQuizDisplay = document.getElementById('trivia-quiz-display');
const quizTitle = document.querySelector('.trivia__quiz-title');

const selectTopicSplashPage = document.getElementById('trivia__topic-splash-page');
const selectLevelSplashPage = document.getElementById('trivia__level-splash-page');
const selectAmountSplashPage = document.getElementById('trivia__amount-splash-page');
const endSplashPage = document.getElementById('trivia__end-splash-page');
const splashHeaderText = document.getElementById('trivia__splash-header-text');

const selectedTopic = document.getElementById('trivia__select-topic-form');
const selectTopicRadioContainers = document.querySelectorAll('.trivia__select-topic-radio-container');
const selectTopicRadioButtons = document.querySelectorAll('input[name="topic"]');

const selectedLevel = document.getElementById('trivia__select-level-form');
const selectLevelRadioContainers = document.querySelectorAll('.trivia__select-level-radio-container');
const selectLevelRadioButtons = document.querySelectorAll('input[name="level"]');

const selectedAmount = document.getElementById('trivia__select-amount-form');
const selectAmountRadioContainers = document.querySelectorAll('.trivia__select-amount-radio-container');
const selectAmountRadioButtons = document.querySelectorAll('input[name="amount"]');

const questionEl = document.getElementById('trivia-question');
const answerOneText = document.getElementById('option1-text');
const answerTwoText = document.getElementById('option2-text');
const answerThreeText = document.getElementById('option3-text');
const answerFourText = document.getElementById('option4-text');
const answerButtons = Array.from(document.querySelectorAll('input[name="answer"]'));

const checkAnswerButton = document.getElementById('check-answer-btn');
const nextQuestionButton = document.getElementById('next-question-btn');
const endQuizButton = document.getElementById('end-quiz-btn');

const startAgainButton = document.getElementById('start-again-btn');
const goHomeButton = document.getElementById('go-home-btn');

const scoreEl = document.getElementById('trivia-score');
const finalScoreEl = document.getElementById('trivia-final-score');

let amount;
let level;
let category;

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionIndex = -1;
let availableQuestions = [];
let questions = [];

async function fetchQuiz() {
    const exampleAPIUrl = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${level}&type=multiple`;
    const response = await fetch(exampleAPIUrl, {
        headers: {
            Accept: 'application/json'
        }
    });

    const data = await response.json();

    questions = data.results.map((question) => {
        const formattedQuestion = {
            question: decodeHTMLEntities(question.question),
            correctAnswer: question.correct_answer,
            status: 'incomplete'
        };

        const answerOptions = [...question.incorrect_answers, formattedQuestion.correctAnswer].sort(() => Math.random() - .5);

        answerOptions.forEach((option, index) => {
            formattedQuestion["option" + (index + 1)] = option;
        });

        return formattedQuestion;
    });

    startQuiz();
}

function decodeHTMLEntities(text) {
    var textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  }

function startQuiz() {
    availableQuestions = [...questions];
    triviaSetupDisplay.hidden = true;
    selectAmountSplashPage.hidden = true;
    triviaQuizDisplay.hidden = false;
    setTitle();
    getNewQuestion();
}

function setTitle() {
    let categoryName = 'Science Trivia';
    if (category === '17') {
        categoryName = 'Science and Nature';
    } else if (category === '18') {
        categoryName = 'Computers';
    }
    quizTitle.innerHTML = `${categoryName} - ${amount} Questions`;
}

function getNewQuestion() {
    if (questionIndex >= availableQuestions.length - 1) {
        endQuiz();
    } else {
        questionIndex++;
    }

    currentQuestion = availableQuestions[questionIndex];

    resetStyle();
    setQuestion(currentQuestion);

    answerButtons.forEach(btn => btn.disabled = false);
}

function resetStyle() {
    resetAnswerButtons();
    unselectAnswer();
    resetRadioButtons();
    nextQuestionButton.hidden = true;
    checkAnswerButton.hidden = false;
}

function unselectAnswer() {
    answerButtons.forEach(button => {
            button.nextElementSibling.classList.remove('trivia__highlight-right');
            button.nextElementSibling.classList.remove('trivia__highlight-wrong');
    });
}

function resetRadioButtons() {
    answerButtons.forEach(radio => radio.checked = false);
}

function setQuestion(q) {
    questionEl.innerText = q.question;
    answerOneText.innerText = q.option1;
    answerTwoText.innerText = q.option2;
    answerThreeText.innerText = q.option3;
    answerFourText.innerText = q.option4;
}

function showQuestionAmountPage() {
    splashHeaderText.innerText = 'How Many Questions?';
    selectLevelSplashPage.hidden = true;
    selectAmountSplashPage.hidden = false;
}

function showLevelPage() {
    splashHeaderText.innerText = 'Choose a Level';
    selectTopicSplashPage.hidden = true;
    selectLevelSplashPage.hidden = false;
}

function getRadioValue(radioButtons) {
   let radioValue;
   radioButtons.forEach((radioInput) => {
       if (radioInput.checked) {
           radioValue = radioInput.value;
       }
   });
   return radioValue;
}

function endQuiz() {
    checkAnswerButton.hidden = true;
    nextQuestionButton.hidden = true;
    triviaQuizDisplay.hidden = true;
    
    triviaSetupDisplay.hidden = false;
    endSplashPage.hidden = false;
    splashHeaderText.innerText = 'How did you do?';
    finalScoreEl.innerText = `Your Final Score: ${score}`;
}

function handleSelectTopic(e) {
    e.preventDefault();
    category = getRadioValue(selectTopicRadioButtons);
    if (category) {
        showLevelPage();
    }
}

function handleSelectLevel(e) {
    e.preventDefault();
    level = getRadioValue(selectLevelRadioButtons);
    if (level) {
        showQuestionAmountPage();
    }
}

function handleSelectAmount(e) {
    e.preventDefault();
    amount = getRadioValue(selectAmountRadioButtons);
    if (amount) {
        fetchQuiz();
    }
}

function resetAnswerButtons() {
    answerButtons.forEach(button => {
        button.nextElementSibling.classList.remove('trivia__selected-answer');
    });
}

function highlightSelectedAnswer(e) {
    e.target.nextElementSibling.classList.add('trivia__selected-answer');
}

function checkAnswer() {
    const answerEl = answerButtons.find(button => button.checked);
    const userAnswer = answerEl.nextElementSibling.children[1].innerText;
    const correctAnswer = currentQuestion.correctAnswer.toString();
    
    if (userAnswer === correctAnswer) {
        setRightAnswer();
    } else if (userAnswer !== correctAnswer) {
        setWrongAnswer();
    }

    answerButtons.forEach(btn => btn.disabled = true);

    checkAnswerButton.hidden = true;

    if (questionIndex >= availableQuestions.length - 1) {
        nextQuestionButton.hidden = true;
        endQuizButton.hidden = false;
    } else {
        nextQuestionButton.hidden = false;
    }    
}

function setRightAnswer() {
    answerButtons.forEach(button => {
        if (button.checked) {
            button.nextElementSibling.classList.add('trivia__highlight-right');
        };
    });
    const answerState = 'correct';
    updateScore(answerState);
}

function setWrongAnswer() {
    answerButtons.forEach(button => {
        if (button.checked) {
            button.nextElementSibling.classList.add('trivia__highlight-wrong');
        };
    });

    const correctAnswer = currentQuestion.correctAnswer.toString();

    answerButtons.forEach(button => {
        const answer = button.nextElementSibling.children[1].innerText;
        if (answer === correctAnswer) {
            button.nextElementSibling.classList.add('trivia__highlight-right');
        }
    });

    const answerState = 'incorrect';
    updateScore(answerState);
}

function updateScore(state) {
    console.log(state);
    if (state === 'correct') {
        score += 5;

    } else if (state === 'incorrect') {
        score -= 3;
    } else if (state === 'restart') {
        score = 0;
    }

    scoreEl.innerText = `${score}`;
}

function restartTriviaQuiz() {
    currentQuestion = {};
    acceptingAnswers = false;
    questionIndex = -1;
    availableQuestions = [];
    questions = [];

    const answerState = 'restart';
    updateScore(answerState);
    resetAnswerButtons();
    resetStyle();

    endQuizButton.hidden = true;
    endSplashPage.hidden = true;
    selectTopicSplashPage.hidden = false;
}

selectedTopic.addEventListener('click', () => {
    selectTopicRadioContainers.forEach((radioEl) => {
        radioEl.classList.remove('trivia__selected-radio-label');
        if (radioEl.children[1].checked) {
            radioEl.classList.add('trivia__selected-radio-label');
        }
    });
});
selectedTopic.addEventListener('submit', handleSelectTopic);

selectedLevel.addEventListener('click', () => {
    selectLevelRadioContainers.forEach((radioEl) => {
        radioEl.classList.remove('trivia__selected-radio-label');
        if (radioEl.children[1].checked) {
            radioEl.classList.add('trivia__selected-radio-label');
        }
    });
});
selectedLevel.addEventListener('submit', handleSelectLevel);

selectedAmount.addEventListener('click', () => {
    selectAmountRadioContainers.forEach((radioEl) => {
        radioEl.classList.remove('trivia__selected-radio-label');
        if (radioEl.children[1].checked) {
            radioEl.classList.add('trivia__selected-radio-label');
        }
    });
});
selectedAmount.addEventListener('submit', handleSelectAmount);

answerButtons.forEach(button => {
    button.addEventListener('change', (e) => {
        resetAnswerButtons();
        highlightSelectedAnswer(e);
    })
});

checkAnswerButton.addEventListener('click', checkAnswer);
nextQuestionButton.addEventListener('click', getNewQuestion);
endQuizButton.addEventListener('click', endQuiz);
startAgainButton.addEventListener('click', restartTriviaQuiz);
goHomeButton.addEventListener('click', () => {
    location.href = 'https://www.mrmcgory.com';
});