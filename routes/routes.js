'use strict'

const Express = require('express');
const ErrorHandler = require('../db/lib/errorHandler')

module.exports = database => {
  const router = Express.Router();

  router.get('/getOrderByOrderId/:id', async (req, res, next) => {
    try {
      let id = req.params.id
      const db = await database;
      let order = await db.Order.findByPk(id)
      res.json({
        order
      })
    } catch (error) {
      ErrorHandler(error, next)
    }
  })

  router.get('/getOrdersByUserId/:id', async (req, res, next) => {
    try {
      let userId = req.params.id
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

  router.get('/getOrdersByDeliveryPersonId/:id', async (req, res, next) => {
    try {
      let deliveryPersonId = req.params.id
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
      const db = await database;
      let body = req.body
      body.userId = req.user.id
      let answer = await db.Order.create(body)
      console.log(answer)
      res.json({
        success: true
      });
    } catch (error) {
      ErrorHandler(error, next)
    }
  })

  return router;
}