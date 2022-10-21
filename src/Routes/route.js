const express = require("express");
const router = express.Router();

const userController = require("../Controllers/userController");
const slotController = require("../Controllers/slotController");
const bookingController = require("../Controllers/bookingController");

const {authentication,authorization} = require("../Middlewares/auth");



router.post('/register',userController.createUser)

router.post('/login',userController.login)

router.post('/slot/:adminId',slotController.createSlot)       //only admin can create slot

router.get('/slot',authentication,slotController.getSlot)     //Login user can see the slot

router.post('/booking/:userId',authentication,authorization,bookingController.bookSlot) 

router.put('/booking/:userId',authentication,authorization,bookingController.updateBooking) //user cancelled the booking slot only



module.exports = router;