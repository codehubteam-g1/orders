const debug = require('debug')('ordenes:db:setup')
const express = require('express')
const asyncify = require('express-asyncify')
const db = require('rappid-db')


const config = require('./config')
const api = asyncify(express.Router())

let service, Orders, OrderProduct, OrderStatus

api.use('*',  async (req, res, next)=>{
    if (!service){
        try{           
            service = await db(config.db)
        }catch (e){
            return next(e)
        }
    
        Orders= service.Order
        OrderProduct= service.OrderProducts
        OrderStatus = service.OrderStatus
    }
    next()
})


api.get('/orders', async (req, res, next)=>{
    let ord = []
    console.log("entra")
    try{
        ord = await Orders.findAllOrders()
    }catch(e){
        return next(e)
    }
    
    res.send({ord })
})

api.get('/orders/:id', async (req, res, next)=>{
    const {id} = req.params
    ord=[]
    ord = await Orders.findOrderByPk(id)
    if(!ord){
        return next(new Error("id no found"))
    }
    res.send({ord})
})

api.get('/orderProduct', async (req, res)=>{
    ord=[]
    ord = await OrderProduct.findAllOrdersProduct()
    if(!ord){
        return next(new Error("no products"))
    }
    res.send({ord})
})
module.exports = api