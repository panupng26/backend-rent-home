const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController');
const reportController = require('../controller/ReportController');
const estateController = require('../controller/EstateController');
const reviewController = require('../controller/ReviewController');
const uploadImageController = require('../controller/UploadImageController');
const chatController = require('../controller/ChatController');
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
router.post('/edit/imageprofile', verifyToken , userController.editImageProfile)

router.get('/user/:id', userController.getUserById)

// reportcontroller
router.post('/report/:id', verifyToken, reportController.reportEstate)
router.post('/all/report', verifyToken, reportController.reportAll)

// reviewcontroller
router.post('/review/:id', verifyToken, reviewController.createReview)
router.get('/review/:id' , reviewController.getReviewByEstateId)


// estatecontroller
router.post('/admin/status/estate', verifyToken, estateController.getAllStatusEstate)
router.post('/status/estate', verifyToken, estateController.getIdStatusEstate)
router.post('/create/estate', verifyToken, estateController.createEstate)
router.post('/update/estate/:id', verifyToken, estateController.updateEstate)
router.get('/estate/:id', estateController.getEstateById)
router.post('/get/list/estate', verifyToken, estateController.getListEstateUser)
router.post('/admin/list/estate', verifyToken, estateController.getListALLEstate)
router.post('/admin/list/unsuspended', verifyToken, estateController.getListNotSuspended)
router.delete('/delete/estate/:id', verifyToken, estateController.deleteEstateById)
router.post('/list/estate', estateController.filterAllEstate)
router.post('/suspended/:id', verifyToken, estateController.suspendedEstateById)
router.post('/admin/list/onlysuspended', verifyToken, estateController.getOnlySuspendedList)
router.post('/admin/cancel/suspended/:id', verifyToken, estateController.cancelSuspendedById)
router.post('/update/status/:id', verifyToken, estateController.updateStatusByEstateId)

// chatcontroller
router.post('/chat/to/owner/:id', verifyToken, chatController.chatToOwnerEstate)
router.get('/get/chat/', verifyToken, chatController.chatUserId)
router.post('/1on1/:id', verifyToken, chatController.getChat1ON1)

router.get('/carousel/condo', estateController.getCondoCarousel)
router.get('/carousel/townhouse', estateController.getTownHouseCarousel)
router.get('/carousel/home', estateController.getHomeCarousel)

// uploadImageController
router.post('/uploadimage', uploadImageController.uploadImages)

module.exports = router;