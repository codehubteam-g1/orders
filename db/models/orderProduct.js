'use strict'

const Sequelize = require('sequelize')

module.exports = sequelize => {

  let orderProductModel = sequelize.define('orders_products', {
    productId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    quantity: {
      type: Sequelize.STRING,
      allowNull: false
    }
  })

  return orderProductModel
}