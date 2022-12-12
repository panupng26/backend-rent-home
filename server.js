// const express = require('express')
// require('dotenv').config()
// const app = express()
// const bodyParser = require('body-parser')
// const mysql = require('mysql')
// const ApiResponse = './ApiResponse'

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))

// const conn = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '12345678',
//     database: 'bu_home_project',
//     port: 3306
// })
// conn.connect()

// app.get('/', (req, res) => {
//     return res.send({ 
//         error: false,
//         message: "Welcome to RESTFUL API TEST" 
//     })
// })

// app.post('/login', (req, res) => {
//     const { username, password } = req.body
//     conn.query(`select * from users where username = '${username}' and password = '${password}'`, (err,result,fields) => {
//         if(err) throw err
//         console.log(ApiResponse.error(result))
//         console.log(result)
//         // return req.send(ApiResponse.success(result))
//     })
// })

// app.listen(process.env.port_server, () => { 
//     console.log(`https://localhost:${process.env.port_server}`)
// })

// module.exports = app