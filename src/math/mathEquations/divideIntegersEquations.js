import { getRandomInt, getRandomPositiveNum } from '../mathUtils/getRandom';
import shuffle from '../mathUtils/shuffle';

function createDivideIntegersEquations(questionAmount, firstNumber, secondNumber, equationsArray, equationObject, wrongFormat) {
    const correctEquations = getRandomPositiveNum(questionAmount);
    const wrongEquations = questionAmount - correctEquations;
  
    for (let i = 0; i < correctEquations; i++) {
      firstNumber = getRandomInt(100);
      if (firstNumber === 0) {
        firstNumber = getRandomInt(100);
      }
      secondNumber = getRandomInt(15);
      if (secondNumber === 0) {
        secondNumber = getRandomInt(15);
      }
      const equationValue = (firstNumber / secondNumber).toFixed(2);
      const equation = `${firstNumber} \u00f7 ${secondNumber} = ${equationValue}`;
      equationObject = { value: equation, evaluated: 'true' };
      equationsArray.push(equationObject);
    }
  
    for (let i = 0; i < wrongEquations; i++) {
      firstNumber = getRandomInt(100);
      if (firstNumber === 0) {
        firstNumber = getRandomInt(100);
      }
      secondNumber = getRandomInt(15);
      if (secondNumber === 0) {
        secondNumber = getRandomInt(15);
      }
      const equationValue = (firstNumber / secondNumber).toFixed(2);
      wrongFormat[0] = `${firstNumber} \u00f7 ${secondNumber + Math.floor(Math.random() + 10)} = ${equationValue}`;
      wrongFormat[1] = `${firstNumber} \u00f7 ${secondNumber * (Math.floor(Math.random() - 3))} = ${equationValue - 1}`;
      wrongFormat[2] = `${firstNumber + (Math.floor(Math.random() + 5))} \u00f7 ${secondNumber} = ${equationValue}`;
      const formatChoice = getRandomPositiveNum(3);
      const equation = wrongFormat[formatChoice];
      equationObject = { value: equation, evaluated: 'false' };
      equationsArray.push(equationObject);
    }
    shuffle(equationsArray);    
}

export default createDivideIntegersEquations;