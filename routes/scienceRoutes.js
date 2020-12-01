const express = require('express');
const scienceController = require('./../controllers/scienceController');

const router = express.Router();

router.get('/', scienceController.getScienceLessons);
router.get('/:slug', scienceController.getSingleLesson);
router.get('/:slug/demo-name', scienceController.getDemoName);

module.exports = router;