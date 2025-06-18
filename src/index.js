require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

const sensorRoutes = require('./routes/sensorRoutes');
const controlRoutes = require('./routes/controlRoutes');
const espRoutes = require("./routes/ipespRoutes");

const app = express();
const PORT = process.env.PORT || 8000;
const HOST = '0.0.0.0';

app.use(cors());
app.use(express.json());

app.use('/api', sensorRoutes);
app.use('/api', controlRoutes);
app.use('/api', espRoutes);


sequelize.sync()
  .then(() => {
    app.listen(PORT, HOST, () => {
      console.log(`Server running on http://${HOST}:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('DB connection error:', err);
  });
