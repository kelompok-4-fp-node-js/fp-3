'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TransactionHistory.belongsTo(models.Product, { foreignKey: 'ProductId' })
      TransactionHistory.belongsTo(models.User, { foreignKey: 'UserId' })

    }
  }
  TransactionHistory.init({
    ProductId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: "Quantity amount cannot be null"
      },
      validate: {
        isInt: {
          args: true,
          msg: "Quantity amount must be an integer"
        }}
      },
    total_price: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: "Total price amount cannot be null"
      },
      validate: {
        isInt: {
          args: true,
          msg: "Total price amount must be an integer"
        }}
      }
  }, {
    sequelize,
    modelName: 'TransactionHistory',
    freezeTableName: true

  });
  return TransactionHistory;
};