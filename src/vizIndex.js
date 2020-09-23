import '@babel/polyfill';

import { RecentEarthquakes }  from './visuals/modules/recentEarthquakes.js';

const id = window.location.pathname.replace('/data-visuals/', '');

async function getVisual(id)  {
    const response = await fetch(`https://mrmcgory.com/data-visuals/${id}/visual-name`, {
        headers: {
            Accept: 'application/json'
        }
    });

    const visual = await response.json();

    if (visual.filename === RecentEarthquakes.name) {
        RecentEarthquakes.visual();
    }
};

getVisual(id);