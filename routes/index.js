const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController');
const reportController = require('../controller/ReportController');
const estateController = require('../controller/EstateController');
const uploadImageController = require('../controller/UploadImageController');
const verifyToken = require('../middleware/auth');
const { validateIdReport } = require('../middleware/validations');

// usercontroller
router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)
router.post('/logout',verifyToken, userController.logout)
router.get('/', async (req, res) => {
    res.status(200).json({ status: true, error: [], message: "Finish server" })
})
router.get('/getprofile',verifyToken , userController.getProfile)
router.post('/edit/profile/:id', verifyToken , userController.editProfile)
router.post('/')

// reportcontroller
router.post('/report/:id', validateIdReport, reportController.reportEstate)

// estatecontroller
router.post('/create/estate', estateController.createEstate)
router.post('/update/estate/:id', estateController.updateEstate)
router.get('/estate/:id', estateController.getEstateById);

// uploadImageController
router.post('/uploadimage', uploadImageController.uploadImages)

module.exports = router;