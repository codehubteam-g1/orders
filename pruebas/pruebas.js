
'use strict'

const db = require('..')

async function run (){

    const config = {
        database: process.env.DB_NAME || 'ordenes',
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || 'password',
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql'
      }
    
    
    const {Order, OrderProducts,OrderStatus } = await db(config).catch(handleFatalError)

    //const orders = await Order.findAll().catch(handleFatalError)

    //console.log(orders)
    //console.log(orders)

    const order = await Order.findByPk(2).catch(handleFatalError)
    console.log(order)
}

function handleFatalError (err) {
  console.error(err.message)
  console.error(err.stack)
  process.exit(1)
}

run()
