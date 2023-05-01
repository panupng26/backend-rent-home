require('dotenv').config()
require('./config/database').connect()


const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
const verifyToken  = require('./middleware/auth')
const routes = require('./routes');

app.use(express.json())

app.use('/', routes)
app.use('/public', express.static('public'));

module.exports = app