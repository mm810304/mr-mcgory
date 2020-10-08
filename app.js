const path = require('path');
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const compression = require('compression');
const fetch = require('node-fetch');

dotenv.config({ path: './config.env' });

const app = express();

const mainRouter = require('./routes/mainRoutes');
const scienceRouter = require('./routes/scienceRoutes');
const dataVisualRouter = require('./routes/dataVisualRoutes');
const webQuizRouter = require('./routes/webQuizRoutes');
const quizRouter = require('./routes/quizRoutes');
const timeKillerRouter = require('./routes/timeKillerRoutes');
const socialMediaRouter = require('./routes/socialMediaRoutes')

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Connecting to MongoDB mrm DB
const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('DB connection successful');
});

//Middleware
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());

//Home Page and Category Page Routes
app.use('/', mainRouter);
app.use('/science', scienceRouter);
app.use('/data-visuals', dataVisualRouter);
app.use('/web-development', webQuizRouter);
app.use('/quizzes', quizRouter);
app.use('/time-killers', timeKillerRouter);
app.use('/social-media', socialMediaRouter);

app.use('/get-nasa-data', async (req, res, next) => {
    let count = 10;
    const API_KEY = process.env.NASA_API_KEY;
    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=${count}`;
    
    const response = await fetch(apiUrl);
    const nasaData = await response.json();
    
    res.json(nasaData);
    next();
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});