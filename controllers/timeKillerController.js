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
    const app = await TimeKillers.findById(id);
    
    if (app.name === 'hangman') {
        res.render('./pages/timekillers/hangman', {
            title: app.title,
            category: app.category,
            description: app.description,
        });
    } else if (app.name === 'sketch') {
        res.render('./pages/timekillers/sketch', {
            title: app.title,
            category: app.category,
            description: app.description,
        });
    } else if (app.name === 'nasa') {
        res.render('./pages/timekillers/nasa', {
            title: app.title,
            category: app.category,
            description: app.description,
        });
    }
};

exports.getAppName = async (req, res, next) => {
    const id = req.params.id;
    const appName = await TimeKillers.findById(id).select('name');

    res.json(appName);
};


