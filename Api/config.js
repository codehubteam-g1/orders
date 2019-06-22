const debug = require('debug')('ordenes:db:setup')

module.exports = {
  db: {
    database: process.env.DB_NAME || 'ordenes',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'password',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: s => debug(s),
    setup: true
  }
}