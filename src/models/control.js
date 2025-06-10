const { DataTypes, Model } = require('sequelize');

class Control extends Model {
  static initModel(sequelize) {
    Control.init({
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      manual: { type: DataTypes.BOOLEAN, allowNull: false },
      state: { type: DataTypes.INTEGER, allowNull: false }, // 0 atau 1
    }, {
      sequelize,
      modelName: 'Control',
      timestamps: true,
      tableName: 'control',
    });
  }
}

module.exports = Control;
