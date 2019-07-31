'use strict'

const Sequelize = require('sequelize')
const SetupOrderModel = require('./models/order')
const SetupOrderProductModel = require('./models/orderProduct')

const config = {
    database: process.env.DB_NAME || '',
    username: process.env.DB_USER || '',
    password: process.env.DB_PASS || '',
    host: process.env.DB_HOST || '',
    dialect: 'postgres',
    setup: process.env.DB_SETUP || false,
    logging: console.log,
    define: {
        underscored: true,
        freezeTableName: true,
        paranoid: true
    }
}

module.exports = async function () {

    const sequelize = new Sequelize(config)

    await sequelize.authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });

    const Order = SetupOrderModel(sequelize)
    const OrderProduct = SetupOrderProductModel(sequelize)

    Order.hasMany(OrderProduct, { onDelete: 'CASCADE' , as: 'OrderProducts'})
    OrderProduct.belongsTo(Order)

    if (config.setup) sequelize.sync({ force: true, logging: console.log })

    return {
        Order,
        OrderProduct
    }
}