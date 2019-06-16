
const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupOrderModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('orders', {
    id: {
      type: Sequelize.INTEGER, autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    delivery_person_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    order_status: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultStatus: 0
    },
    creation_date: {
      type: Sequelize.TIME,
      allowNull: false
    }

  })
}
