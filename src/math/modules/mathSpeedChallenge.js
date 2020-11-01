export const SpeedChallenge = {
    app(createEquations, storage) {
        const gamePage = document.getElementById('game-page');
        const scorePage = document.getElementById('score-page');
        const splashPage = document.getElementById('splash-page');
        const countdownPage = document.getElementById('countdown-page');
        
        const startForm = document.getElementById('start-form');
        const radioContainers = document.querySelectorAll('.math-speed__radio-container');
        const radioInputs = document.querySelectorAll('.math-speed__radio');
        const bestScores = document.querySelectorAll('.math-speed__best-score-value');
        
        const countdown = document.querySelector('.math-speed__countdown');
        
        const itemContainer = document.querySelector('.math-speed__item-container');
        
        const finalTimeEl = document.querySelector('.math-speed__final-time');
        const baseTimeEl = document.querySelector('.math-speed__base-time');
        const penaltyTimeEl = document.querySelector('.math-speed__penalty-time');
        const playAgainBtn = document.querySelector('.math-speed__play-again');
        
        const rightBtn = document.querySelector('.math-speed__right');
        const wrongBtn = document.querySelector('.math-speed__wrong');
        
        const id = window.location.pathname.replace('/math/', '');
        
        let storageKey = storage;
        let questionAmount = 0;
        let equationsArray = [];
        let playerGuessArray = [];
        let bestScoreArray = [];
        
        let firstNumber = 0;
        let secondNumber = 0;
        let equationObject = {};
        const wrongFormat = [];
        let allEquations;
        
        let timer;
        let timePlayed = 0;
        let baseTime = 0;
        let penaltyTime = 0;
        let finalTime = 0;
        let finalTimeDisplay = '0.0';
        
        let valueY = 0;       
        
        function bestScoresToDOM() {
          bestScores.forEach((bestScore, index) => {
            const bestScoreEl = bestScore;
            bestScoreEl.textContent = `${bestScoreArray[index].bestScore}s`;
          });
        }
        
        function getSavedBestScores() {
          if (localStorage.getItem(storageKey)) {
            bestScoreArray = JSON.parse(localStorage.bestScores);
          } else {
            bestScoreArray = [
              { questions: 10, bestScore: finalTimeDisplay },
              { questions: 25, bestScore: finalTimeDisplay },
              { questions: 50, bestScore: finalTimeDisplay },
              { questions: 99, bestScore: finalTimeDisplay },
            ];
            localStorage.setItem(storageKey, JSON.stringify(bestScoreArray));
          }
          bestScoresToDOM();
        }
        
        function updateBestScore() {
          bestScoreArray.forEach((score, index) => {
            if (questionAmount == score.questions) {
              const savedBestScore = Number(bestScoreArray[index].bestScore);
              if (savedBestScore === 0 || savedBestScore > finalTime) {
                bestScoreArray[index].bestScore = finalTimeDisplay;
              }
            }
          });
          bestScoresToDOM();
          localStorage.setItem(storageKey, JSON.stringify(bestScoreArray));
        }

        
        function showScorePage() {
          setTimeout(() => {
            playAgainBtn.hidden = false;
          }, 1000);
          gamePage.hidden = true;
          scorePage.hidden = false;
        }
        
        function scoresToDOM() {
          finalTimeDisplay = finalTime.toFixed(1);
          baseTime = timePlayed.toFixed(1);
          penaltyTime = penaltyTime.toFixed(1);
          baseTimeEl.textContent = `Base Time: ${baseTime}s`;
          penaltyTimeEl.textContent = `Penalty Time: +${penaltyTime}s`;
          finalTimeEl.textContent = `${finalTimeDisplay}s`;
          updateBestScore();
          itemContainer.scrollTo({ top: 0, behavior: 'instant' });
          showScorePage();
        }
        
        function checkTime() {
          if (playerGuessArray.length == questionAmount) {
            clearInterval(timer);
            equationsArray.forEach((equation, index) => {
              if (equation.evaluated === playerGuessArray[index]) {
              } else {
                penaltyTime += 1.0;
              }
            });
            finalTime = timePlayed + penaltyTime;
            scoresToDOM();
          }
        }
        
        function addTime() {
          timePlayed += 0.1;
          checkTime();
        }
        
        function startTimer() {
          timePlayed = 0;
          penaltyTime = 0;
          finalTime = 0;
          timer = setInterval(addTime, 100);
          gamePage.removeEventListener('click', startTimer);
        }
        
        function select(guessedTrue) {
          valueY += 80;
          itemContainer.scroll(0, valueY);
          return guessedTrue ? playerGuessArray.push('true') : playerGuessArray.push('false');
        }
        
        function showGamePage() {
          gamePage.hidden = false;
          countdownPage.hidden = true;
        }
  
        function equationsToDOM() {
          equationsArray.forEach((equation) => {
            const item = document.createElement('div');
            item.classList.add('math-speed__item');
            const equationText = document.createElement('h1');
            equationText.classList.add('math-speed__item-text');
            equationText.textContent = equation.value;
            item.appendChild(equationText);
            itemContainer.appendChild(item);
          });
        }
        
        function populateGamePage() {
          itemContainer.textContent = '';
        
          const topSpacer = document.createElement('div');
          topSpacer.classList.add('math-speed__height-240');
        
          const selectedItem = document.createElement('div');
          selectedItem.classList.add('math-speed__selected-item');
        
          itemContainer.append(topSpacer, selectedItem);
        
          createEquations(questionAmount, firstNumber, secondNumber, equationsArray, equationObject, wrongFormat);
          equationsToDOM();
        
          const bottomSpacer = document.createElement('div');
          bottomSpacer.classList.add('math-speed__height-500');
          itemContainer.appendChild(bottomSpacer);
        }

        function playAgain() {
            gamePage.addEventListener('click', startTimer);
            scorePage.hidden = true;
            splashPage.hidden = false;
            equationsArray = [];
            playerGuessArray = [];
            valueY = 0;
            playAgainBtn.hidden = true;
          }
        
        function countdownStart() {
          countdown.textContent = '3';
          setTimeout(() => {
            countdown.textContent = '2';
          }, 1000);
          setTimeout(() => {
            countdown.textContent = '1';
          }, 2000);
          setTimeout(() => {
            countdown.textContent = 'Start';
          }, 3000);
        }
        
        function showCountdown() {
          countdownPage.hidden = false;
          splashPage.hidden = true;
          countdownStart();
          populateGamePage();
          setTimeout(showGamePage, 4000);
        }
        
        function getRadioValue() {
          let radioValue;
          radioInputs.forEach((radioInput) => {
            if (radioInput.checked) {
              radioValue = radioInput.value;
            }
          });
          return radioValue;
        };
        
        function selectQuestionAmount(e) {
          e.preventDefault();
          questionAmount = getRadioValue();
          if (questionAmount) {
            showCountdown();
          }
        };
        
        startForm.addEventListener('click', () => {
          radioContainers.forEach((radioEl) => {
            radioEl.classList.remove('math-speed__selected-label');
            if (radioEl.children[1].checked) {
              radioEl.classList.add('math-speed__selected-label');
            }
          });
        });
        
        startForm.addEventListener('submit', selectQuestionAmount);
        gamePage.addEventListener('click', startTimer);
        rightBtn.addEventListener('click', () => {
          select(true);
        });
        wrongBtn.addEventListener('click', () => {
          select(false);
        });
        playAgainBtn.addEventListener('click', playAgain);
        
        getSavedBestScores();
    }
}

