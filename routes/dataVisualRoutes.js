const express = require('express');
const dataVisualController = require('../controllers/dataVisualController');

const router = express.Router();

router.get('/', dataVisualController.getDataVisualLessons);
router.get('/:id', dataVisualController.getVisualLesson);
router.get('/:id/visual-name', dataVisualController.getVisualName);

module.exports = router;