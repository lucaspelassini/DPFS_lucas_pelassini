'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        as: 'category'
      });
      
      Product.hasMany(models.ProductColor, {
        foreignKey: 'productId',
        as: 'colors'
      });
      
      Product.hasMany(models.CartItem, {
        foreignKey: 'productId',
        as: 'cartItems'
      });
    }
  }
  
  Product.init({
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    categoryId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING(255),
      defaultValue: 'default-product.jpg'
    },
    stock: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
    timestamps: true,
    underscored: true
  });
  
  return Product;
};