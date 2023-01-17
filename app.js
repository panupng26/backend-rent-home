require('dotenv').config()
require('./config/database').connect()

const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const verifyToken  = require('./middleware/auth')
const routes = require('./routes');

app.use(express.json())

app.use('/', routes)

// app.post('/welcome', verifyToken, (req, res) => {
//     res.status(200).send("hello everybody")
// })


module.exports = app