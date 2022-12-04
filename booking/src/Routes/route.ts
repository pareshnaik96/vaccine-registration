import express from "express";
const router = express.Router();

import { bookSlot, updateBooking } from "../Controllers/bookingController";

import { authentication, authorization } from "../Middlewares/auth";



router.post('/booking/:userId', authentication, authorization, bookSlot)

router.put('/booking/:userId', authentication, authorization, updateBooking) //user cancelled the booking slot only



export default router;