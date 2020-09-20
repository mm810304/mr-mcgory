const express = require('express');
const scienceController = require('./../controllers/scienceController');

const router = express.Router();

router.get('/', scienceController.getScienceLessons);
router.get('/:id', scienceController.getSingleLesson);
router.get('/:id/demo-name', scienceController.getDemoName);

module.exports = router;