module.exports = function setupOrderProduct (OrderProductModel) {

    async function findOrderProductById(id){
        return OrderProductModel.findByPk(id)
    }

    async function findAllOrdersProduct () {
        return OrderProductModel.findAll()
    }

    async function deletOrdersProduct (ordersProducts) {
      const cond = {
        where:{
          id: ordersProducts.id
        },
        truncate: 1
      }
      const deleted = await OrderProductModel.destroy(cond)
      return deleted
    }

    async function deleteAllOrdersProduct (order) {

      const cond = {
        where:{
          orderId: order.id
        },
        truncate: 1
      }
      const deleted = await OrderProductModel.destroy(cond)
      return deleted
    }

    return {
        findOrderProductById,  
        findAllOrdersProduct,
        deletOrdersProduct,
        deleteAllOrdersProduct
      }
}