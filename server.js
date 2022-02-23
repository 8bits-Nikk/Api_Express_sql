require('dotenv').config()

const express = require('express')
const app = express()
app.use(express.json())

app.listen(process.env.MY_APP_PORT, ()=> console.log("Server Started on "+ process.env.MY_APP_PORT))

const userDataRouter = require('./routes/userData')
app.use('/users', userDataRouter)

const addColumnRouter = require('./routes/columnRouter')
app.use('/column', addColumnRouter)

const deleteColumnRouter = require('./routes/deleteColumn')
app.use('/column/delete', deleteColumnRouter)

// const addRowRouter = require('./routes/rowRouter')
// app.use('/row')

const deleteRowRouter = require('./routes/deleteRow')
app.use('/row/delete', deleteRowRouter)
