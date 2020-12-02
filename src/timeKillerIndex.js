import '@babel/polyfill';

import Hangman from './timekillers/hangman.js';
import Sketch from './timekillers/sketch.js';
import Nasa from './timekillers/nasa.js';
import Philosophy from './timekillers/philosophy.js';

const slugName = window.location.pathname.replace('/time-killers/', '');

async function getAppName(slugName) {
    const response = await fetch(`https://mrmcgory.com/time-killers/${slugName}/app-name`, {
        headers: {
            Accept: 'application/json'
        }
    });

    const app = await response.json();

    if (app.name === Hangman.id) {
        Hangman.app();
    } else if (app.name === Sketch.id) {
        Sketch.app();
    } else if (app.name === Nasa.id) {
        Nasa.app();
    } else if (app.name === Philosophy.id) {
        Philosophy.app();
    }
}

getAppName(slugName);