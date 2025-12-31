'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Un usuario tiene muchos carritos
      User.hasMany(models.Cart, {
        foreignKey: 'userId',
        as: 'carts'
      });
    }
  }
  
  User.init({
    firstName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    category: {
      type: DataTypes.ENUM('user', 'admin'),
      defaultValue: 'user'
    },
    image: {
      type: DataTypes.STRING(255),
      defaultValue: 'default-avatar.jpg'
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    underscored: true
  });
  
  return User;
};