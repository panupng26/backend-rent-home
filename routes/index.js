const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController');
const reportController = require('../controller/ReportController');
const estateController = require('../controller/EstateController');
const reviewController = require('../controller/ReviewController');
const uploadImageController = require('../controller/UploadImageController');
const verifyToken = require('../middleware/auth');

// usercontroller
router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)
router.post('/logout',verifyToken, userController.logout)
router.get('/', async (req, res) => {
    res.status(200).json({ status: true, error: [], message: "Finish server" })
})
router.get('/getprofile',verifyToken , userController.getProfile)
router.post('/edit/profile', verifyToken , userController.editProfile)
router.get('/user/:id', userController.getUserById)

// reportcontroller
router.post('/report/:id', verifyToken, reportController.reportEstate)
router.get('/all/report', verifyToken, reportController.reportAll)

// reviewcontroller
router.post('/review/:id', verifyToken, reviewController.createReview)
router.get('/review/:id' , reviewController.getReviewByEstateId)


// estatecontroller
router.post('/create/estate', verifyToken, estateController.createEstate)
router.post('/update/estate/:id', verifyToken, estateController.updateEstate)
router.get('/estate/:id', estateController.getEstateById)
router.post('/get/list/estate', verifyToken, estateController.getListEstateUser)
router.post('/admin/list/estate', verifyToken, estateController.getListALLEstate)
router.delete('/delete/estate/:id', verifyToken, estateController.deleteEstateById)
router.post('/list/estate', estateController.filterAllEstate)

// uploadImageController
router.post('/uploadimage', uploadImageController.uploadImages)

module.exports = router;