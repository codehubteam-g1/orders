//const debug = require('debug')()
const express = require('express')

const api = express.Router()


api.get('/orders', (req, res)=>{
    res.send({})
})

api.get('/orders/:id', (req, res, next)=>{
    const {id} = req.params
    if(id != 12){
        return next(new Error(" No found"))
    }
    res.send({id})
})

api.get('/orderProduct/:id', (req, res)=>{
    const {id} = req.params
    res.send({id})
})
module.exports = api