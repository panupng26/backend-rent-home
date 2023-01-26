require('dotenv').config()
require('./config/database').connect()


const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const verifyToken  = require('./middleware/auth')
const routes = require('./routes');
const cors = require('cors')
app.use(cors())
app.use(express.json())

app.use('/', routes)

module.exports = app