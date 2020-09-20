import getWalls from '../demoUtils/walls.js';

export const Friction = {
    demo() {
        const questions = ['1.  What is friction?', '2.  Adjust the friction sliders for each of the boxes.  How does the friction level affect how the boxes slide?', '3.  What happens if you turn the friction level all the way to zero?',  '4.  What happens if you turn the friction level all the way up?',  '5.  An icy road has less friction than a normal road.  How does this affect how people drive?'];
        let questionIndex = 0;

        //DOM Elements
        const questionText = document.querySelector('.demo-questions__text');
        const prevButton = document.querySelector('#prev-btn');
        const nextButton = document.querySelector('#next-btn');
        const controls = document.querySelector('#controls');

        //Helper Functions
        const showQuestion = function() {
            questionText.innerText = questions[questionIndex];
        };  
        
        //Setting up DOM Elements
        showQuestion();

        controls.innerHTML = `
        <h4 class="controls-title-no-margin"><u>Controls</u></h4>
        <div class="slider-container__friction">
            <div class="friction-slider">
                <p><label for="friction-box-one">Friction - Blue: </label><input type="range" id="friction-box-one" name="friction-box-one" min="0" max="1" value="0.5" step="0.0001"><span class="friction-slider__current" id="current-friction-box-one"></span></p>
                <output id="friction-box-one-output"></output>
            </div>

            <div class="friction-slider">
                <p><label for="friction-box-two">Friction - Red: </label><input type="range" id="friction-box-two" name="friction-box-two" min="0" max="1" value="0.01" step="0.0001"><span class="friction-slider__current" id="current-friction-box-two"></span></p>
                <output id="friction-box-two-output"></output>    
            </div>

            <div class="friction-slider">
                <p><label for="friction-box-three">Friction - Green: </label><input type="range" id="friction-box-three" name="friction-box-three" min="0" max="1" value="0.0009" step="0.0001"><span class="friction-slider__current" id="current-friction-box-three"></span></p>
                <output id="friction-box-three-output"></output>
            </div>
        </div>
        `;

        //Matter JS code - DOM elements are below
        const { Engine, Render, Runner, MouseConstraint, Mouse, World, Bodies } = Matter;

        //DOM Elements
        const boxOne = document.querySelector('#friction-box-one');
        const boxOneOutput = document.querySelector('#friction-box-one-output');
        boxOneOutput.value = boxOne.value;

        const boxTwo = document.querySelector('#friction-box-two');
        const boxTwoOutput = document.querySelector('#friction-box-two-output');
        boxTwoOutput.value = boxTwo.value;
        

        const boxThree = document.querySelector('#friction-box-three');
        const boxThreeOutput = document.querySelector('#friction-box-three-output');
        boxThreeOutput.value = boxThree.value;

        let boxOneFriction = boxOne.value;
        let boxTwoFriction = boxTwo.value;
        let boxThreeFriction = boxThree.value;

            //Create Engine and World
        const engine = Engine.create();
        const world = engine.world;

        //Create Renderer
        const wrapper = document.querySelector('#demo-wrapper');
        const width = window.innerWidth;
        const height = window.innerHeight * 0.70;

        const render = Render.create({
            element: wrapper,
            engine: engine,
            options: {
                width: width,
                height: height,
                showVelocity: true,
                wireframes: false,
            }
        });

        Render.run(render);

        //Create Runner
        const runner = Runner.create();
        Runner.run(runner, engine);

        //Add Bodies
        const walls = getWalls(width, height);

        //Add Walls
        World.add(world, [
            // walls
            Bodies.rectangle(walls.topX, walls.topY, walls.topWidth, walls.topHeight, { isStatic: true }), //Top
            Bodies.rectangle(walls.bottomX, walls.bottomY, walls.bottomWidth, walls.bottomHeight, { isStatic: true }), //Bottom
            Bodies.rectangle(walls.rightX, walls.rightY, walls.rightWidth, walls.rightHeight, { isStatic: true }), //Right
            Bodies.rectangle(walls.leftX, walls.leftY, walls.leftWidth, walls.leftHeight, { isStatic: true }),
        ]);

        const ramp1 = Bodies.rectangle(300, 180, 700, 20, {
            isStatic: true,
            angle: Math.PI * 0.06,
            render: {
                fillStyle: 'whitesmoke'
            }
        });

        const box1 = Bodies.rectangle(300, 70, 40, 40, {
            friction: 0.5,
            render: {
                fillStyle: 'blue'
            }
        });

        World.add(world, [ramp1, box1]);

        const ramp2 = Bodies.rectangle(300, 350, 700, 20, {
            isStatic: true,
            angle: Math.PI * 0.06,
            render: {
                fillStyle: 'whitesmoke'
            }
        });

        const box2 = Bodies.rectangle(300, 250, 40, 40, {
            friction: 0.01,
            render: {
                fillStyle: 'red'
            }
        });

        World.add(world, [ramp2, box2]);

        const ramp3 = Bodies.rectangle(300, 520, 700, 20, {
            isStatic: true, 
            angle: Math.PI * 0.06,
            render: {
                fillStyle: 'whitesmoke'
            }
        });

        const box3 = Bodies.rectangle(300, 430, 40, 40, {
            friction: 0.0009,
            render: {
                fillStyle: 'green'
            }
        });

        World.add(world, [ramp3, box3]);



        //Add Mouse Control
        const mouse = Mouse.create(render.canvas);

        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

        World.add(world, mouseConstraint);

        //Keep the mouse in sync with rendering
        render.mouse = mouse;

        //Fit the render viewport to the scene
        Render.lookAt(render, {
            min: { x: 0, y: 0 },
            max: { x: width, y: height }
        });

        //Friction Sliders

        //Event Listeners
        boxOne.addEventListener('input', () => {
            boxOneOutput.value = boxOne.value;
            box1.friction = boxOne.value;
        });   
        boxTwo.addEventListener('input', () => {
            boxTwoOutput.value = boxTwo.value;
            box2.friction = boxTwo.value;
        }); 
        boxThree.addEventListener('input', () => {
            boxThreeOutput.value = boxThree.value;
            box3.friction = boxThree.value;
        });   
    
        //Question Buttons
        prevButton.addEventListener('click', () => {
            if (questionIndex === 0) {
                questionIndex = questions.length - 1;
                showQuestion();
            } else {
                questionIndex--;
                showQuestion();
            }
        });

        nextButton.addEventListener('click', () => {
            if (questionIndex === questions.length - 1) {
                questionIndex = 0;
                showQuestion();
            } else {
                questionIndex++;
                showQuestion();
            }
        });

        return {
            engine: engine,
            runner: runner,
            render: render,
            canvas: render.canvas,
            stop: function() {
                Matter.Render.stop(render);
                Matter.Render.stop(runner);
            }
        };
    }    
};

Friction.id = 'friction';