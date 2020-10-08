import '@babel/polyfill';

import Hangman from './timekillers/hangman.js';
import Sketch from './timekillers/sketch.js';
import Nasa from './timekillers/nasa.js';

const id = window.location.pathname.replace('/time-killers/', '');

async function getAppName(id) {
    const response = await fetch(`https://mrmcgory.com/time-killers/${id}/app-name`, {
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
    }
}

getAppName(id);