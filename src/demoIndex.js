import '@babel/polyfill';

import { Friction } from './activities/modules/friction.js';
import { Gravity } from './activities/modules/gravity.js';
import { RecentEarthquakes } from './activities/modules/recentEarthquakes';

const slugName = window.location.pathname.replace('/science/', '');
console.log(slugName);

async function getDemo(slugName) {
    const response = await fetch(`https://mrmcgory.com/science/${slugName}/demo-name`, {
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

getDemo(slugName);


