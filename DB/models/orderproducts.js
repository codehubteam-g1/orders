const Sequelize = require('sequelize')

const setupDatabase = require('../lib/db')

module.exports = function setupOrderproductModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('orderProducts', {
    id: {
      type: Sequelize.INTEGER,autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultStatus: 1
    }
  })
}