const { Model, DataTypes } = require("sequelize");

class SensorData extends Model {
  static initModel(sequelize) {
    SensorData.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        ldr: DataTypes.INTEGER,
        hujan: DataTypes.INTEGER,
      },
      {
        sequelize, // HARUS ADA ini!
        modelName: "SensorData",
        tableName: "sensor_data",
        timestamps: true,
      }
    );
  }
}

module.exports = SensorData;
