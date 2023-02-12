const bcrypt = require('bcryptjs')
const userService = require('../services/UserService');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    // 0 false : 1 true
    try {
        const { first_name, last_name, email, password, phone } = req.body;
        if(!(email && password && first_name && last_name && phone)) {
            return res.status(400).json({ status: false, error: true, message: "All input is required" });
        }
        const user = await userService.register({
            first_name,
            last_name,
            email,
            password,
            phone,
        });
        const token = jwt.sign({ user_id: user.id, email }, process.env.TOKEN_KEY, { expiresIn: "12h" });
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
        console.log('user:', user)
        return res.status(200).json(user)
    } catch (err) {
        return res.status(400).json({ status: false, error: true, message: "Invalid token" })
    }
}

exports.logout = async (req, res) => {
    try {
        const { email } = req.body
        // return res.status(200).json(req.body)
      const user = await userService.logoutUser(email);
      return res.status(200).json({
        message: "User logged out successfully",
        user: user
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Internal Server Error"
      });
    }
}

exports.getProfile = async (req, res) => {
    try {
        const id  = req.params.id
        const profile = await userService.getProfile(id);
        // console.log(profile)
        return res.status(200).json({
            status: true,
            data: profile
        });
    } catch (err) {
        console.error(err)
        return res.status(500).json({
            message: "Error i can't find user Or it's not register in website"
        })
    }
}