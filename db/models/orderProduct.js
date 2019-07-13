'use strict'

const Sequelize = require('sequelize')

module.exports = sequelize => {

  let orderProductModel = sequelize.define('orders_products', {
    orderId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    productId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    }
  })

  return orderProductModel
}