require('dotenv').config()
require('./config/database').connect()

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const express = require('express')
const User = require('./model/user')
const app = express()
const verifyToken  = require('./middleware/auth')

app.use(express.json())

app.post('/register', async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;

        if(!(email && password && first_name && last_name)) {
            res.status(400).send({ status: false, error: true, message: "All input is required" })
        }

        const oldUser = await User.findOne({ email })

        if(oldUser) {
            return res.status(409).json({ status: false, error: true, message: "User already exists. Please Login" } )
        }

        encryptedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(),
            password: encryptedPassword
        })

        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "12h"
            }
        )

        user.token = token

        res.status(201).json(user)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: true, message: err })
    }
})

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!(email && password)) {
            res.status(400).json({ status: false, error: true, message: 'Invalid email or password' })
        }

        const user = await  User.findOne({ email })
        if( user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "12h"
                }
            )
            user.token = token;
            res.status(200).json(user)
        }
        res.status(400).json({ status: false, error: true, message: "Invalid token" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: true, message: err })
    }
})

app.post('/welcome', verifyToken, (req, res) => {
    res.status(200).send("hello everybody")
})
module.exports = app