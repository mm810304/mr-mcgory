const path = require('path');
const fetch = require('node-fetch');
const TimeKillers = require('../models/TimeKillers');

exports.getTimeKillers = async (req, res, next) => {
    const lessons = await TimeKillers.find({});

    res.render('./pages/category', {
        lessons,
        category: 'Time Killers',
        description: 'Got some extra time?  Nothing to study?  I do not belive you, but anyway, try these out.'
    });
};

exports.getSingleApp = async (req, res, next) => {
    const id = req.params.id;
    const app = await TimeKillers.findById(id).select('name');
    
    res.sendFile(path.join(__dirname, '../public', 'pages', 'timekillers', `${app.name}.html`));
};

exports.getAppName = async (req, res, next) => {
    const id = req.params.id;
    const appName = await TimeKillers.findById(id).select('name');

    res.json(appName);
};


