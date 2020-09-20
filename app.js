const path = require('path');
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

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
});

//Middleware
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Home Page and Category Page Routes
app.use('/', mainRouter);
app.use('/science', scienceRouter);
app.use('/data-visuals', dataVisualRouter);
app.use('/web-development', webQuizRouter);
app.use('/quizzes', quizRouter);
app.use('/time-killers', timeKillerRouter);
app.use('/social-media', socialMediaRouter);

const port = process.env.PORT;
app.listen(port);