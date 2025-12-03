const express = require('express');
const router = express.Router();
const betLogController = require('../controllers/betLogController');

router.post('/log', betLogController.logBet);
router.get('/log', betLogController.getBets);

module.exports = router;