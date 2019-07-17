'use strict'

const Sequelize = require('sequelize')

module.exports = sequelize => {

  let orderModel = sequelize.define('orders', {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    storeId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    deliveryPersonId: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    userAddressId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    userPaymentAccountId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    status: {
      type: Sequelize.INTEGER,
      // 'El restaurante está preparando tu comida', 'El domiciliario está esperando tu orden en el restaurante', 'El domiciliario esta en camino a tu dirección', 'El domiciliario esta en la puerta de tu casa', 'Pedido entregado'
      allowNull: false,
      defaultValue: 1,
      validate: {
        max: 5,
        min: 1,
      }
    }
  })

  return orderModel
}
