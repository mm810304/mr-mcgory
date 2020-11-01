import { getRandomInt, getRandomPositiveNum } from '../mathUtils/getRandom';
import shuffle from '../mathUtils/shuffle';

export default function createAddIntegersEquations(questionAmount, firstNumber, secondNumber, equationsArray, equationObject, wrongFormat) {
    const correctEquations = getRandomPositiveNum(questionAmount);
    const wrongEquations = questionAmount - correctEquations;
  
    for (let i = 0; i < correctEquations; i++) {
      firstNumber = getRandomInt(100);
      secondNumber = getRandomInt(100);
      const equationValue = firstNumber + secondNumber;
      const equation = `${firstNumber} + ${secondNumber} = ${equationValue}`;
      equationObject = { value: equation, evaluated: 'true' };
      equationsArray.push(equationObject);
    }
  
    for (let i = 0; i < wrongEquations; i++) {
      firstNumber = getRandomInt(100);
      secondNumber = getRandomInt(100);
      const equationValue = firstNumber * secondNumber;
      wrongFormat[0] = `${firstNumber} + ${secondNumber + Math.floor(Math.random() * 10)} = ${equationValue}`;
      wrongFormat[1] = `${firstNumber} + ${secondNumber - (Math.floor(Math.random() * 5))} = ${equationValue - 1}`;
      wrongFormat[2] = `${firstNumber + (Math.floor(Math.random() * 3))} + ${secondNumber} = ${equationValue}`;
      const formatChoice = getRandomPositiveNum(3);
      const equation = wrongFormat[formatChoice];
      equationObject = { value: equation, evaluated: 'false' };
      equationsArray.push(equationObject);
    }
    shuffle(equationsArray);    
}
