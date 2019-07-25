'use strict'

const Express = require('express');
const ErrorHandler = require('../db/lib/errorHandler')

module.exports = database => {
  const router = Express.Router();

  router.get('/getUnassignedOrders', async (req, res, next) => {
    try {
      const db = await database;
      let orders = await db.Order.findAll({ where: { deliveryPersonId: null } })
      res.json({
        orders
      })
    } catch (error) {
      ErrorHandler(error, next)
    }
  })

  router.post('/takeOrder/:id', async (req, res, next) => {
    try {
      if (req.headers.usertype != 'delivery person') {
        throw ({ error: new Error('Debes estar logeado como domiciliario para poder tomar una orden'), status: 401 })
      } 
      let orderId = req.params.id
      let deliveryPersonId = req.headers.id
      const db = await database;
      let order = await db.Order.findByPk(orderId)
      await order.update({deliveryPersonId})
      res.json({
        success: true
      })
    } catch (error) {
      ErrorHandler(error, next)
    }
  })

  router.get('/getOrderByOrderId/:id', async (req, res, next) => {
    try {
      let orderId = req.params.id
      const db = await database;
      let order = await db.Order.findByPk(orderId)
      res.json({
        order
      })
    } catch (error) {
      ErrorHandler(error, next)
    }
  })

  router.get('/getOrdersByUserId', async (req, res, next) => {
    try {
      if (req.headers.usertype != 'client') {
        throw ({ error: new Error('Debes estar logeado como cliente para poder ver tus órdenes'), status: 401 })
      }
      let userId = req.headers.id
      const db = await database;
      let orders = await db.Order.findAll({ where: { userId } })
      res.json({
        orders
      })
    } catch (error) {
      ErrorHandler(error, next)
    }
  })

  router.get('/getOrdersByStoreId/:id', async (req, res, next) => {
    try {
      if (req.headers.usertype != 'administrator') {
        throw ({ error: new Error('Debes estar logeado como administrador para poder ver tus órdenes'), status: 401 })
      }
      let storeId = req.params.id
      const db = await database;
      let orders = await db.Order.findAll({ where: { storeId } })
      res.json({
        orders
      })
    } catch (error) {
      ErrorHandler(error, next)
    }
  })

  router.get('/getOrdersByDeliveryPersonId', async (req, res, next) => {
    try {
      if (req.headers.usertype != 'delivery person') {
        throw ({ error: new Error('Debes estar logeado como domiciliario para poder ver tus órdenes'), status: 401 })
      }
      let deliveryPersonId = req.headers.id
      const db = await database;
      let orders = await db.Order.findAll({ where: { deliveryPersonId } })
      res.json({
        orders
      })
    } catch (error) {
      ErrorHandler(error, next)
    }
  })

  router.post('/createOrder', async (req, res, next) => {
    try {
      if (req.headers.usertype != 'client') {
        throw ({ error: new Error('Debes estar logeado como cliente para poder crear una orden'), status: 401 })
      }
      if(!req.body.products){
        throw ({ error: new Error('La orden no tiene productos'), status: 401 })
      }

      const db = await database;
      let body = req.body
      body.userId = req.headers.id
      let order = await db.Order.create(body)

      req.body.products.forEach(async product => {
        await order.createOrderProduct(product)
      });

      res.json({
        success: true
      });
    } catch (error) {
      ErrorHandler(error, next)
    }
  })

  router.get('/getOrderProducts/:id', async (req, res, next) => {
    try {
      let id = req.params.id
      const db = await database;
      let order = await db.Order.findByPk(id)
      let products = await order.getOrderProducts()
      res.json({
        products
      })
    } catch (error) {
      ErrorHandler(error, next)
    }
  })

  router.post('/changeOrderStatus/:id', async (req, res, next) => {
    try {
      if (req.headers.usertype != 'delivery person') {
        throw ({ error: new Error('Debes estar logeado como domiciliario para poder cambiar el estado de una orden'), status: 401 })
      }

      let orderId = req.params.id
      const db = await database;
      let order = await db.Order.findByPk(orderId)
      await order.update({status: req.body.status})
      res.json({
        success: true
      })
    } catch (error) {
      ErrorHandler(error, next)
    }
  })

  return router;
}