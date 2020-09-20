import getWalls from '../demoUtils/walls.js';

export const Gravity = {
    demo() {
        const questions = ['1. What is gravity?', '2. What happens if gravity is set to zero?', '3. What happens if you turn gravity up as strong as it can go?', '4. The gravity on the moon is less than the gravity on Earth.  What do you think it is like to move on the moon?', '5. What would it be like to move on a planet that had really strong gravity?  Turn the gravity slider all the way up and see how objects moves.'];

        let questionIndex = 0;
    
        //Matter JS - DOM Elements, Event Listeners, etc. are below
        const { Engine, Render, Runner, Composites, Common, MouseConstraint, Mouse, World, Bodies } = Matter;
    
        //Create Engine
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
                showAngleIndicator: true
            }
        });
    
        Render.run(render);
    
        //Create Runner
        const runner = Runner.create();
        Runner.run(runner, engine);
    
        //Add Bodies
        //Get walls
        const walls = getWalls(width, height);
    
        //Add Walls
        World.add(world, [
            // walls
            Bodies.rectangle(walls.topX, walls.topY, walls.topWidth, walls.topHeight, { isStatic: true }), //Top
            Bodies.rectangle(walls.bottomX, walls.bottomY, walls.bottomWidth, walls.bottomHeight, { isStatic: true }), //Bottom
            Bodies.rectangle(walls.rightX, walls.rightY, walls.rightWidth, walls.rightHeight, { isStatic: true }), //Right
            Bodies.rectangle(walls.leftX, walls.leftY, walls.leftWidth, walls.leftHeight, { isStatic: true }),
        ]);
    
        engine.world.gravity.y = 0.5;
    
        const stack = Composites.stack(50, 120, 20, 5, 0, 0, function(x, y) {
            switch (Math.round(Common.random(0, 1))) {
    
                case 0:
                    if (Common.random() < 0.75) {
                        return Bodies.rectangle(x, y, Common.random(25, 60), Common.random(25, 60));
                    } else {
                        return Bodies.rectangle(x, y, Common.random(40, 80), Common.random(15, 30));
                    }
    
                case 1:
                    return Bodies.polygon(x, y, Math.round(Common.random(1, 8)), Common.random(20, 50));
            }
        });
    
        World.add(world, stack);
    
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
    
        //Keep Mouse in sync with rendering
        render.mouse = mouse;
    
        //Fit render viewport to scene
        Render.lookAt(render, {
            min: { x: 0, y: 0 },
            max: { x: width, y: height }
        });
    
        //End of Matter JS Set Up Code
    
        //DOM
    
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
         <h4 class="controls-title"><u>Controls</u></h4>
         <div class="slider-container">
             <p><label for="gravity">Gravity: </label><input type="range" id="gravity" name="gravity" min="-1" max="5" value="1" step="0.2"><span class="gravity-slider__current" id="current-gravity"></span></p>
             <output id="gravity-output"></output>
         </div>
         `;
     
         //Gravity Slider Elements
         const gravitySlider = document.querySelector('#gravity');
         const gravitySliderOutput = document.querySelector('#gravity-output');
         gravitySliderOutput.value = gravitySlider.value;
    
        //Event Listeners
    
        //Gravity Slider 
        gravitySlider.addEventListener('input', () => {
            gravitySliderOutput.value = gravitySlider.value;
            engine.world.gravity.y = gravitySlider.value;
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
    
        //Content for Matter Tools.Demo
        return {
            engine: engine,
            runner: runner,
            render: render,
            canvas: render.canvas,
            stop: function() {
                Matter.Render.stop(render);
                Matter.Runner.stop(runner);
            }
        }
    }
};

Gravity.id = 'gravity';
