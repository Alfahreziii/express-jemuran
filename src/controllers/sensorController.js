const { SensorData } = require('../models');

const clients = [];
let sensorDataCache = { ldr: null, hujan: null };

exports.streamSensorData = (req, res) => {
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  });
  res.flushHeaders();

  res.write(`data: ${JSON.stringify(sensorDataCache)}\n\n`);

  const clientId = Date.now();
  const newClient = { id: clientId, res };
  clients.push(newClient);

  req.on('close', () => {
    clients.splice(clients.findIndex(c => c.id === clientId), 1);
  });
};

exports.postSensorData = async (req, res) => {
  const { ldr, hujan } = req.body;
  console.log("Data diterima:", ldr, hujan); // cek apakah data masuk

  if (typeof ldr !== 'number' || typeof hujan !== 'number') {
    return res.status(400).json({ message: 'Invalid data' });
  }

  try {
    const savedData = await SensorData.create({ ldr, hujan });
    console.log("Data disimpan ke DB:", savedData); // log hasil simpan

    sensorDataCache = { ldr, hujan };
    clients.forEach(client => {
      client.res.write(`data: ${JSON.stringify(sensorDataCache)}\n\n`);
    });

    res.status(200).json({ message: 'Sensor data saved' });
  } catch (error) {
    console.error("Error saat menyimpan ke DB:", error);
    res.status(500).json({ message: 'Failed to save sensor data' });
  }
};

