import '@babel/polyfill';

import { SpeedChallenge } from './math/modules/mathSpeedChallenge';

import createMultiplyIntegersEquations from './math/mathEquations/multiplyIntegersEquations';
import createAddIntegersEquations from './math/mathEquations/addIntegersEquations';
import createSubtractIntegersEquations from './math/mathEquations/subtractIntegersEquations';
import createDivideIntegersEquations from './math/mathEquations/divideIntegersEquations';

const slugName = window.location.pathname.replace('/math/', '');

async function getMathSpeedChallenge(slugName) {
  const response = await fetch(`https://mrmcgory.com/math/${slugName}/math-speed-name`, {
    headers: {
      Accept: 'application/json'
    }
  });

  const mathSpeedLesson = await response.json();

  if (mathSpeedLesson.filename === 'multiply-integers-speed') {
    const storage = 'bestScoresMultiplyIntegers';
    SpeedChallenge.app(createMultiplyIntegersEquations, storage);
  }
  if (mathSpeedLesson.filename === 'add-integers-speed') {
    const storage = 'bestScoresAddIntegers';
    SpeedChallenge.app(createAddIntegersEquations, storage);
  }
  if (mathSpeedLesson.filename === 'subtract-integers-speed') {
    const storage = 'bestScoresSubtractIntegers';
    SpeedChallenge.app(createSubtractIntegersEquations, storage)
  }
  if (mathSpeedLesson.filename === 'divide-integers-speed') {
    const storage = 'bestScoresDivideIntegers';
    SpeedChallenge.app(createDivideIntegersEquations, storage);
  }
};

getMathSpeedChallenge(slugName);