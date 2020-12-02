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
    const slugName = req.params.slug;
    const appData = await TimeKillers.find({ slug: slugName });
    const app = appData[0];
    
    if (app.name === 'hangman') {
        res.render('./pages/timekillers/hangman', {
            title: app.title,
            category: app.category,
            description: app.description,
            slug: app.slug
        });
    } else if (app.name === 'sketch') {
        res.render('./pages/timekillers/sketch', {
            title: app.title,
            category: app.category,
            description: app.description,
            slug: app.slug
        });
    } else if (app.name === 'nasa') {
        res.render('./pages/timekillers/nasa', {
            title: app.title,
            category: app.category,
            description: app.description,
            slug: app.slug
        });
    } else if (app.name === 'philosophy') {
        res.render('./pages/timekillers/philosophy', {
            title: app.title,
            category: app.category,
            description: app.description,
            slug: app.slug
        });
    }
};

exports.getAppName = async (req, res, next) => {
    const slugName = req.params.slug;
    const appNameData = await TimeKillers.find({ slug: slugName }).select('name');
    const appName = appNameData[0];

    res.json(appName);
};


