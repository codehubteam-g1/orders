'use strict'

module.exports = function setupOrder (OrderModel) {
 
  function findAll () {
    return OrderModel.findAll().toJSON()
  }

  function findByPk (id) {
    return OrderModel.findByPk(id).toJSON()
  }

  return {
    findAll,
    findByPk
  }

  
}