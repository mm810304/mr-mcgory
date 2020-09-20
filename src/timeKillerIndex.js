import '@babel/polyfill';

import Hangman from './timekillers/hangman.js';

const id = window.location.pathname.replace('/time-killers/', '');

async function getAppName(id) {
    const response = await fetch(`http://localhost:5000/time-killers/${id}/app-name`, {
        headers: {
            Accept: 'application/json'
        }
    });

    const app = await response.json();

    if (app.name === Hangman.id) {
        Hangman.app();
    }
}

getAppName(id);