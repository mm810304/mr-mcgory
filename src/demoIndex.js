import '@babel/polyfill';

import { Friction } from './activities/modules/friction.js';
import { Gravity } from './activities/modules/gravity.js';

const id = window.location.pathname.replace('/science/', '');

async function getDemo(id) {
    const response = await fetch(`https://mrmcgory.com/science/${id}/demo-name`, {
        headers: {
            Accept: 'application/json'
        }
    });

    const lesson = await response.json();

    if (lesson.filename === Gravity.id) {
        Gravity.demo();
    }

    if (lesson.filename === Friction.id) {
        Friction.demo();
    }

};

getDemo(id);


