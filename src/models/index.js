const sequelize = require("../config/database");
const SensorData = require("./sensorData");
const Control = require("./control");

SensorData.initModel(sequelize);
Control.initModel(sequelize);

module.exports = {
  sequelize,
  SensorData,
  Control,
};
