const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController');
const reportController = require('../controller/ReportController');
const verifyToken = require('../middleware/auth');
const { validateIdReport } = require('../middleware/validations');

// usercontroller
router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)
router.post('/logout',verifyToken, userController.logout)
router.get('/', async (req, res) => {
    res.status(200).json({ status: true, error: [], message: "Finish server" })
})

// reportcontroller
router.post('/report/:id', validateIdReport, reportController.reportEstate)

module.exports = router;