const express = require('express');
const socialMediaController = require('./../controllers/socialMediaController');

const router = express.Router();

router.get('/', socialMediaController.getSocialMediaLessons);
router.get('/:slug', socialMediaController.getSingleLesson);

module.exports = router;