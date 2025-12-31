'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductColor extends Model {
    static associate(models) {
      ProductColor.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'product'
      });
    }
  }
  
  ProductColor.init({
    productId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    color: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'ProductColor',
    tableName: 'product_colors',
    timestamps: false,
    underscored: true
  });
  
  return ProductColor;
};