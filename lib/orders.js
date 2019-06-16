'use strict'

module.exports = function setupOrder (OrderModel) {
 
  async function findAllOrders () {
    return OrderModel.findAll()
  }

  async function findOrderByPk (id) {
    return OrderModel.findByPk(id)
  }

  async function createOrder(orde) {
    const result = await OrderModel.create(orde)
    return result.toJSON()
  }

  async function updateOrder(orde, status) { 
    //TODO
  }

  return {
    findAllOrders,
    findOrderByPk,
    createOrder,
    updateOrder    
  }

  
}