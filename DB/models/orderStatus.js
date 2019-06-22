const Sequelize = require('sequelize')

const setupDatabase = require('../lib/db')

module.exports = function setupOrderStatusModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('orderStatus', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true
    }
  })
}