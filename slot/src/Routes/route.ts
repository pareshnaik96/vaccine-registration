import express from "express";
const router = express.Router();

import { createSlot, getSlot } from "../Controllers/slotController";

import { authentication, adminAuthorization } from "../Middlewares/auth";


router.post('/slot/:adminId', adminAuthorization, createSlot)       //only admin can create slot

router.get('/slot', authentication, getSlot)     //Login user can see the slot


export default router;