import '@babel/polyfill';

import { philosophyQuestions } from './assets/philosophyQuestions';
import { randomNumber } from '../utils/randomNumber';

const Philosophy = {
    app() {
        const questionText = document.querySelector('.philosophy__question');
        const newQuestionButton = document.querySelector('.philosophy__button');  
        
        const allQuestions = philosophyQuestions;
        
        function getQuestion() {
            let index = randomNumber(allQuestions.length);

            const currentQuestion = allQuestions[index];
            const stringText = currentQuestion.split('');
            console.log(stringText);
            for (let i=0; i < stringText.length; i++) {
                questionText.innerHTML += `<span class="philosophy__letter-span">${stringText[i]}</span>`
            }

            let char = 0;
            let timer = setInterval(onTick, 25);

            function onTick() {
                const span = questionText.querySelectorAll('span')[char];
                span.classList.add('fade');
                char++;
                if (char === stringText.length) {
                    complete();
                    return;
                }
            }

            function complete() {
                clearInterval(timer);
                timer = null;
            }
            
            

            allQuestions.splice(index, 1);
        }

        getQuestion();

        newQuestionButton.addEventListener('click', getQuestion);
    }
};

Philosophy.id = 'philosophy';
export default Philosophy;
