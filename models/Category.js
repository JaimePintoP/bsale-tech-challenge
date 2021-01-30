const { DataTypes } = require('sequelize/types')
const db = require('../db')

db.client.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})
