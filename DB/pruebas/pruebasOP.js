
'use strict'

const db = require('../')

async function run (){

    const config = {
        database: process.env.DB_NAME || 'ordenes',
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || 'password',
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql'
      }
    
    const {Order, OrderProducts,OrderStatus } = await db(config).catch(handleFatalError)
    //const { Order} = await db(config).catch(handleFatalError)


    const ordersProduct = await OrderProducts.findAllOrdersProduct().catch(handleFatalError)
    //console.log(ordersProduct)
   
    const ordersProduct1 = await OrderProducts.findOrderProductById(710).catch(handleFatalError)
    //console.log(ordersProduct1)
    console.log("desde aqui")
    //const ordersProduct2 = await OrderProducts.deletOrdersProduct(ordersProduct1).catch(handleFatalError)
    //console.log(ordersProduct2)
    const order = await Order.findOrderByPk(2).catch(handleFatalError)
    console.log(order)

    const ordersProduct4 = await OrderProducts.deleteAllOrdersProduct(order).catch(handleFatalError)
    console.log(ordersProduct4)


}

function handleFatalError (err) {
  console.error(err.message)
  console.error(err.stack)
  process.exit(1)
}

run()
