import hangmanWords from './assets/hangmanWords';

const Hangman = {
    app() {
        const wordEl = document.querySelector('#word');
        const wrongLettersEl = document.querySelector('#wrong-letters');
        const playAgainBtn = document.querySelector('#play-button');
        const popup = document.querySelector('#popup-container');
        const notification = document.querySelector('#notification-container');
        const finalMessage = document.querySelector('#final-message');
        const figureParts = document.querySelectorAll('.figure-part');

        const words = hangmanWords;

        let selectedWord = words[Math.floor(Math.random() * words.length)];

        const correctLetters = [];
        const wrongLetters = [];

        function displayWord() {
            wordEl.innerHTML = `
                ${selectedWord
                .split('')
                .map(letter => `
                    <span class="letter">
                        ${correctLetters.includes(letter) ? letter : ''}
                    </span>
                `).join('')}
            `;

            const innerWord = wordEl.innerText.replace(/\n/g, '');

            if (innerWord === selectedWord) {
                finalMessage.innerText = 'Congratulations!  You have made Mr. McGory very proud.';
                popup.style.display = 'flex';
            }
        }

        function updateWrongLettersEl() {
            wrongLettersEl.innerHTML = `
            ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
            ${wrongLetters.map(letter => `<span>${letter}</span>`)}
            `;

            figureParts.forEach((part, index) => {
                const errors = wrongLetters.length;
                if (index < errors) {
                    part.style.display = 'block';
                } else {
                    part.style.display = 'none';
                }
            });

            if (wrongLetters.length === figureParts.length) {
                finalMessage.innerText = 'You have seriously disappointed Mr. McGory.  Tsk Tsk Tsk';
                popup.style.display = 'flex';
            }
        }

        function showNotification() {
            notification.classList.add('show');

            setTimeout(() => {
                notification.classList.remove('show');
            }, 2000);
        }

        window.addEventListener('keydown', event => {
            if (event.keyCode >= 65 && event.keyCode <= 90) {
                const letter = event.key;

                if (selectedWord.includes(letter)) {
                    if (!correctLetters.includes(letter)) {
                        correctLetters.push(letter);

                        displayWord();
                    } else {
                        showNotification();
                    }
                } else {
                    if (!wrongLetters.includes(letter)) {
                        wrongLetters.push(letter);

                        updateWrongLettersEl();
                    } else {
                        showNotification();
                    }
                }
            }
        });

        playAgainBtn.addEventListener('click', () => {
            correctLetters.splice(0);
            wrongLetters.splice(0);
            selectedWord = words[Math.floor(Math.random() * words.length)];
            displayWord();

            updateWrongLettersEl();

            popup.style.display = 'none';
        })

        displayWord();
    }
};

Hangman.id = 'hangman';

export default Hangman;