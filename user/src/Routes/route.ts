import express from "express";
const router = express.Router();

import { createUser, login } from "../Controllers/userController";


router.post('/register', createUser)

router.post('/login', login)


export default router;