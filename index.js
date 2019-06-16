'use strict'

const setupDatabase = require('./lib/db')

//
const setupOrderModel = require('./models/orders')
const setupOrderProductsModel = require('./models/orderproducts')
const setupOrderStatusModel = require('./models/orderStatus')
//
const setupOrder =require('./models/orders')

module.exports = async function (config) {
  const sequelize = setupDatabase(config)

  //
  const OrderModel = setupOrderModel(config)
  const OrderProductsModel = setupOrderProductsModel(config)
  const OrderStatusModel = setupOrderStatusModel(config)

  OrderModel.hasMany(OrderProductsModel)
  OrderModel.hasOne(OrderStatusModel)
  OrderProductsModel.belongsTo(OrderModel)
  OrderStatusModel.belongsTo(OrderModel)
  //

  await sequelize.authenticate()

  if (config.setup) {
    await sequelize.sync({ force: true })
  }

  const Order = setupOrder (OrderModel)
  //const Order = {}
  const OrderProducts = {}
  const OrderStatus = {}

  return {

    Order,
    OrderProducts,
    OrderStatus
  }
}
