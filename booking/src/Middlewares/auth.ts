import * as jwt from "jsonwebtoken";
import { Types } from 'mongoose';
import { Request, Response, NextFunction } from 'express'

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

//AuthoriZation
const authorization = async function (req: Request, res: Response, next: NextFunction) {

    try {

        let userId = req.params.userId
        let decodeToken = req.decodeToken

        if (!isValidObjectId(userId)) return res.status(400).send({ status: false, message: "invalid user Id" })

        if (decodeToken && decodeToken.userId == userId)
            next()
        else return res.status(403).send({ status: false, message: "unauthorized.You are not authorize to perform the action." })

    }
    catch (error: any) {
        return res.status(500).send({ status: false, error: error.message })
    }
}

export { authentication, authorization }