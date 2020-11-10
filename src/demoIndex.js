import '@babel/polyfill';

import { Friction } from './activities/modules/friction.js';
import { Gravity } from './activities/modules/gravity.js';
import { RecentEarthquakes } from './activities/modules/recentEarthquakes';

const id = window.location.pathname.replace('/science/', '');

async function getDemo(id) {
    const response = await fetch(`http://localhost:5000/science/${id}/demo-name`, {
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

    if (lesson.filename === RecentEarthquakes.name) {
        RecentEarthquakes.visual();
    }

};

getDemo(id);


