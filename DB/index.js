'use strict'

const setupDatabase = require('./lib/db')
//
const setupOrderModel = require('./models/orders')
const setupOrderProductsModel = require('./models/orderproducts')
const setupOrderStatusModel = require('./models/orderStatus')
//
const setupOrder =require('./lib/orders')
const setupOrderProduct = require('./lib/orderproducts')

module.exports = async function (config) {
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
    await sequelize.sync({ })
  }

  const Order = setupOrder(OrderModel)
  const OrderProducts = setupOrderProduct(OrderProductsModel)
  const OrderStatus = {}
  //const OrderStatus = setupOrderStatus(OrderStatusModel)
  return {

    Order,
    OrderProducts,
    OrderStatus
  }
}
