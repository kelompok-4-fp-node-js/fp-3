'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.hasMany(models.TransactionHistory, { foreignKey: 'ProductId' });
      Product.belongsTo(models.Category, { foreignKey: 'CategoryId' })
    }
  }
  Product.init({
    title:{
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: "Title cannot be null"
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          args: true,
          msg: "Price must be an integer"
        },
        min: {
          args: [0],
          msg: "Price cannot be negative"
        },
        max: {
          args: [50000000],
          msg: "Price cannot exceed 100000000"
        }
      }
  },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          args: true,
          msg: "Stock must be an integer"
        },
        min: {
          args: [5],
          msg: "Stock cannot under 5"
        },
      }
  },
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
    freezeTableName: true

  });
  return Product;
};