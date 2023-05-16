'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.TransactionHistory, { foreignKey: 'UserId' });
    }
  }
  User.init({
    full_name:{
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: "Full name cannot be null"
      },
      validate: {
        notEmpty: {
          msg: 'Full name is required!'
        },
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Email address already in use!'
      },
      allowNull: {
        args: false,
        msg: "Email cannot be null"
      },
      validate: {
        notEmpty: {
          msg: 'Email is required!'
        },
        isEmail: {
          msg: 'Email format is not valid!'
        }
      }
    },
    password: {
    type: DataTypes.STRING,
    allowNull: {
      args: false,
      msg: "Password cannot be null"
    },
    validate: {
      len: {
        args: [6, 10],
        msg: "Password must be between 6 and 10 characters"
      }
    }}
,
    gender: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: "Gender cannot be null"
      },
      validate: {
        isIn: {
          args: [['male', 'female']],
          msg: "Gender must be either 'male' or 'female'"
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: "role cannot be null"
      },
      validate: {
        isIn: {
          args: [['admin', 'customer']],
          msg: "Gender must be either 'admin' or 'customer'"
        }
      }
    },
    balance: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          args: true,
          msg: "Balance must be an integer"
        },
        min: {
          args: [0],
          msg: "Balance cannot be negative"
        },
        max: {
          args: [100000000],
          msg: "Balance cannot exceed 100000000"
        }
      }
  }
}, {
    sequelize,
    modelName: 'User',
    freezeTableName: true
  });

  User.beforeCreate((user, options) => {
    const hashedPassword = bcrypt.hashPassword(user.password)
    user.password = hashedPassword
    user.role = 'customer';
    user.balance = '0';
  })

  return User;
};