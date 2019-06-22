'use strict'

const setupDatabase = require('./lib/db')
const defaults = require('defaults')

//
const setupOrderModel = require('./models/orders')
const setupOrderProductsModel = require('./models/orderproducts')
const setupOrderStatusModel = require('./models/orderStatus')
//
const setupOrder =require('./lib/orders')
const setupOrderProduct = require('./lib/orderproducts')

module.exports = async function (config) {
  config = defaults(config, {
    dialect: 'sqlite',
    pool: {
      max: 10,
      min: 0,
      idle: 10000
    },
    query: {
      raw: true
    }
  })
  const sequelize = setupDatabase(config)

  //
  const OrderModel = setupOrderModel(config)

  const OrderProductsModel = setupOrderProductsModel(config)
  const OrderStatusModel = setupOrderStatusModel(config)

  OrderModel.hasMany(OrderProductsModel)
  OrderProductsModel.belongsTo(OrderModel)

  OrderStatusModel.hasMany(OrderModel)
  OrderModel.belongsTo(OrderStatusModel)
  //

  await sequelize.authenticate()

  if (config.setup) {
    await sequelize.sync({ force: true })
  }

  const Order = setupOrder(OrderModel)
  //const Order = {}
  const OrderProducts = setupOrderProduct(OrderProductsModel)
  const OrderStatus = {}

  return {

    Order,
    OrderProducts,
    OrderStatus
  }
}
