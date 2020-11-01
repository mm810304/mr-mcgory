const express = require('express');
const triviaController = require('../controllers/triviaController');

const router = express.Router();

router.get('/', triviaController.startTrivia);

module.exports = router;