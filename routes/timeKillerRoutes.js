const express = require('express');
const timeKillerController = require('../controllers/timeKillerController');

const router = express.Router();

router.get('/', timeKillerController.getTimeKillers);
router.get('/:slug', timeKillerController.getSingleApp);
router.get('/:slug/app-name', timeKillerController.getAppName);

module.exports = router;