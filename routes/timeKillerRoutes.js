const express = require('express');
const timeKillerController = require('../controllers/timeKillerController');

const router = express.Router();

router.get('/', timeKillerController.getTimeKillers);
router.get('/:id', timeKillerController.getSingleApp);
router.get('/:id/app-name', timeKillerController.getAppName);

module.exports = router;