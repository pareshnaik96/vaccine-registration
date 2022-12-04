import * as jwt from "jsonwebtoken";
import { Types } from 'mongoose';
import { Request, Response, NextFunction } from 'express'
import { IUser } from "service";


const isValidObjectId = function (ObjectId: any) {
    return Types.ObjectId.isValid(ObjectId)
}


// Authentication
const authentication = function (req: Request, res: Response, next: NextFunction) {

    try {
        let token = req.headers["x-api-key"] as string
        if (!token) token = req.headers["X-Api-Key"] as string
        if (!token) return res.status(400).send({ status: false, message: "You are not logged in. Token is required." })

        let decodeToken = jwt.verify(token, "vaccine@key")
        if (!decodeToken) {
            return res.status(401).send({ status: false, message: "You are not authenticate" })
        }
        req.decodeToken = decodeToken as jwt.JwtPayload
        next()

    } catch (error: any) {
        return res.status(500).send({ status: false, message: "Error", error: error.message })
    }
}

const adminAuthorization = async function (req: Request, res: Response, next: NextFunction) {

    try {

        let AdminId = req.params.adminId


        if (!isValidObjectId(AdminId)) return res.status(400).send({ status: false, message: "invalid Id" })

        // let user = await service.userModel.findById({ _id: AdminId })
        let user = await userModel.findById({ _id: AdminId })

        // let admin = await service.userModel.findOne({ name: "Admin" })
        let admin = await userModel.findOne({ role: "admin" })


        if (user && admin && user._id.equals(admin._id))
            next()
        else return res.status(403).send({ status: false, message: "unauthorized.You are not authorize to perform the action." })

    }
    catch (error: any) {
        return res.status(500).send({ status: false, error: error.message })
    }
}

export { authentication, adminAuthorization }