// routes/espRoutes.js
const express = require("express");
const router = express.Router();
const espController = require("../controllers/ipespController");

router.post("/update-ip", espController.updateIP);
router.get("/esp-ip", espController.getIP);

module.exports = router;