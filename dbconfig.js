require('dotenv').config()
const {createPool} = require('mysql')

const pool = createPool({
    host: process.env.MY_DATABASE_HOST,
    user: process.env.MY_DATABASE_USER,
    password: process.env.MY_DATABASE_PASSWORD,
    database:process.env.MY_DATABASE,
    port: process.env.MY_DATABSE_PORT,
})

module.exports = pool
