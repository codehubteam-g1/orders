
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

    const orders = await Order.findAllOrders().catch(handleFatalError)
    console.log(orders)
   

    const order = await Order.findOrderByPk(2).catch(handleFatalError)
    console.log(order)

    const order1 = await Order.createOrder({
      user_id: 567,
      delivery_person_id: 2010,
      order_status: 0,
      creation_date:  "12:45:03",
      createdAt: Date.now(),
      updatedAt: Date.now()
    }).catch(handleFatalError)
    
    console.log(order1)

/*
    const upOrder = await Order.updateOrder({
      updatedAt: Date.now()
    },18).catch(handleFatalError)
    
    console.log(upOrder)
*/
}

function handleFatalError (err) {
  console.error(err.message)
  console.error(err.stack)
  process.exit(1)
}

run()
