// controllers/espController.js
let esp32Ip = "";

const updateIP = (req, res) => {
  const { ip } = req.body;
  if (ip) {
    esp32Ip = ip;
    console.log("IP ESP32:", esp32Ip);
    res.send("IP diterima");
  } else {
    res.status(400).send("Tidak ada IP");
  }
};

const getIP = (req, res) => {
  res.json({ ip: esp32Ip });
};

module.exports = {
  updateIP,
  getIP,
};

