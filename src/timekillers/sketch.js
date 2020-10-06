const Sketch = {
    app() {
        const canvas = document.querySelector('#etch-a-sketch');
        const ctx = canvas.getContext('2d');
        const shakeButton = document.querySelector('#shake-button');
        const challengeButton = document.querySelector('#challenge-button');
        const selectLineWidthEl = document.getElementById('sketch-line-width');
        const selectColorEl = document.getElementById('sketch-color');
        const selectLineCapEl = document.getElementById('sketch-line-cap');
        const lineCapRadioButtons = document.getElementById('sketch-line-cap').querySelectorAll('input');
        const challengeTextEl = document.querySelector('.sketch__challenge-item');

        const radioArray = Array.from(lineCapRadioButtons);

        const MOVE_AMOUNT = 10;

        let challengeItems = ['Robot', 'House', 'Your Teacher', 'The Korean Flag', 'The American Flag', 'A Smiley Face', 'A Cookie', 'A Cake', 'A Tree', 'A Fish', 'A Bear', 'A Dog'];

        const { width, height } = canvas;

        let x = Math.floor(Math.random() * width);
        let y = Math.floor(Math.random() * height);
        let hue = 0;
        let saturation = 90;
        let lightness = 50;
        let hueIncrement;
        let lineCap = 'round';

        ctx.strokeStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        ctx.lineJoin = 'round';
        ctx.lineCap = lineCap;
        ctx.lineWidth = 10;

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y);
        ctx.stroke();

        function draw({ key, lineWidth, color }) {
            if (color === 'red') {
                hue = 6;
                hueIncrement = 0;
                saturation = 90;
                lightness = 50;
            } else if (color === 'rainbow') {
                hue = 0;
                hueIncrement = 2;
                saturation = 90;
                lightness = 50;
            } else if (color === 'rainbow-random') {
                hue = Math.floor(Math.random() * 359);
                hueIncrement = Math.floor(Math.random() * 359);
                saturation = 90;
                lightness = 50;
            } else if ( color === 'blue') {
                hue = 226;
                hueIncrement = 0;
                saturation = 90;
                lightness = 50;
            } else if ( color === 'green') {
                hue = 118;
                hueIncrement = 0;
                saturation = 68;
                lightness = 25;
            } else if ( color === 'pink') {
                hue = 304;
                hueIncrement = 0;
                saturation = 90;
                lightness = 65;
            } else if ( color === 'black') {
                hue = 353;
                hueIncrement = 0;
                saturation = 3;
                lightness = 0;
            } 

            hue = hue + hueIncrement;
            ctx.strokeStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
            
            ctx.lineWidth = lineWidth;
            ctx.lineCap = lineCap;

            ctx.beginPath();
            ctx.moveTo(x, y);

            if (key === 'ArrowUp') {
                y = y - MOVE_AMOUNT;
            } else if (key === 'ArrowDown') {
                y = y + MOVE_AMOUNT;
            } else if (key === 'ArrowRight') {
                x = x + MOVE_AMOUNT;
            } else if (key === 'ArrowLeft') {
                x = x - MOVE_AMOUNT;
            }

            ctx.lineTo(x, y);
            ctx.stroke();
        }

        function clearCanvas() {
            canvas.classList.add('shake');
            canvas.addEventListener('animationend', () => {
                canvas.classList.remove('shake');
            }, { once: true });
            ctx.clearRect(0, 0, width, height);
        }

        function handleKey(e) {
            if (e.key.includes('Arrow')) {
                e.preventDefault();
                draw({
                    key: e.key
                })
            }
        }

        function handleLineWidthChange(e) {
            const lineWidth = e.target.value;
            draw({
                lineWidth: lineWidth
            });
        }

        function handleColorChange(e) {
            if (e.target.value === 'red') {
                draw({
                    color: 'red'
                });
            } else if (e.target.value === 'rainbow') {
                draw({
                    color: 'rainbow'
                });
            } else if (e.target.value === 'rainbow-random') {
                draw({
                    color: 'rainbow-random'
                });
            } else if (e.target.value === 'blue') {
                draw({
                    color: 'blue'
                });
            } else if (e.target.value === 'green') {
                draw({
                    color: 'green'
                });
            } else if (e.target.value === 'pink') {
                draw({
                    color: 'pink'
                });
            } else if (e.target.value === 'black') {
                draw({
                    color: 'black'
                });
            }
        }

        function handleLineCapChange(e) {
            const selectedLineCap = e.target.value;
            lineCap = selectedLineCap;
            console.log(lineCap);
        }

        function handleChallengeButtonClick() {
            const randomInt = Math.floor(Math.random() * challengeItems.length);
            challengeTextEl.textContent = challengeItems[randomInt];
        }

        window.addEventListener('keydown', handleKey);
        shakeButton.addEventListener('click', clearCanvas);
        selectLineWidthEl.addEventListener('change', handleLineWidthChange);
        selectColorEl.addEventListener('change', handleColorChange);
        selectLineCapEl.addEventListener('change', handleLineCapChange)
        challengeButton.addEventListener('click', handleChallengeButtonClick);

    }   
}

Sketch.id = 'sketch';

export default Sketch;

