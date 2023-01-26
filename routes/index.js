const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController');
const verifyToken = require('../middleware/auth');

router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)
router.post('/logout',verifyToken, userController.logout)
router.get('/', async (req, res) => {
    res.status(200).json({ status: true, error: [], message: "Finish server" })
})

module.exports = router;