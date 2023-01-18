const bcrypt = require('bcryptjs')
const userService = require('../services/UserService');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        if(!(email && password && first_name && last_name)) {
            return res.status(400).json({ status: false, error: true, message: "All input is required" });
        }
        const user = await userService.register({
            first_name,
            last_name,
            email,
            password
        });
        const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, { expiresIn: "12h" });
        user.token = token;
        return res.status(201).json(user);
    } catch (err) {
        if (err.message === "User already exists. Please Login") {
            return res.status(409).json({ status: false, error: true, message: err.message });
        }
        console.error(err);
        return res.status(500).json({ error: true, message: "Internal server error" });
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!(email && password)) {
            return res.status(400).json({ status: false, error: true, message: 'Invalid email or password' })
        }
        const user = await userService.loginUser(email, password);
        return res.status(200).json(user)
    } catch (err) {
        return res.status(400).json({ status: false, error: true, message: "Invalid token" })
    }
}