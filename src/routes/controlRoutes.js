const express = require('express');
const controlController = require('../controllers/controlController');
const router = express.Router();

router.get('/control', controlController.getControlState);
router.post('/control', controlController.postControlState);

module.exports = router;
