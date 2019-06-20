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

  async function updateOrder(order, status) { 
    
    const cond = {
      where: {
        id: order.id
      }
    }
    order.order_status= status
    const currentOrder= order
    const updated = await OrderModel.update(order, cond)
    return updated 

    //const updated = await OrderModel.update(order, cond)
    //return updated ? AgentModel.findOne(cond) : existingAgent
  }

  return {
    findAllOrders,
    findOrderByPk,
    createOrder,
    updateOrder    
  }

  
}