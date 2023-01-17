const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController');

router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)
router.get('/', async (req, res) => {
    res.status(400).json({ status: false, error: true, message: "Invalid token" })
})

module.exports = router;