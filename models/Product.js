const { DataTypes, Sequelize, Model } = require('sequelize')
const db = require('../db')

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url_image: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.FLOAT,
    },
    discount: {
      type: DataTypes.INTEGER,
    },
    category: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Category',
        key: 'id',
      },
    },
  },
  {
    sequelize: db.client,
    tableName: 'product',
    timestamps: false,
  }
)

module.exports = Product
