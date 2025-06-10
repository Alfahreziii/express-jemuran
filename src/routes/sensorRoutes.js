const express = require('express');
const sensorController = require('../controllers/sensorController');
const router = express.Router();

router.get('/sensor-data/stream', sensorController.streamSensorData);
router.post('/sensor-data', sensorController.postSensorData);

module.exports = router;
