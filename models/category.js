'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.hasMany(models.Product, { foreignKey: 'CategoryId' });
    }
  }
  Category.init({
    type: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Type address already in use!'
      },
      allowNull: {
        args: false,
        msg: "Type cannot be null"
      }
    },
    sold_product_amount: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: "Product amount cannot be null"
      },
      validate: {
        isInt: {
          args: true,
          msg: "Product amount must be an integer"
        }}
      },
  }, {
    sequelize,
    modelName: 'Category',
    freezeTableName: true

  });
  return Category;
};