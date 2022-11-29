const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');


const isValidObjectId = function (ObjectId) {
    return mongoose.Types.ObjectId.isValid(ObjectId)
}


// Authentication
const authentication = function (req, res, next) {

    try {
        let token = req.headers["x-api-key"]
        if (!token) token = req.headers["X-Api-Key"]
        if (!token) return res.status(400).send({ status: false, message: "You are not logged in. Token is required." })

        let decodeToken = jwt.verify(token, "vaccine@key")
        if (!decodeToken) {
            return res.status(401).send({ status: false, message: "You are not authenticate" })
        }
        req.decodeToken = decodeToken
        next()

    } catch (error) {
        return res.status(500).send({ status: false, message: "Error", error: error.message })
    }
}

//AuthoriZation
const authorization = async function (req, res, next) {

    try {

        let userId = req.params.userId
        let decodeToken = req.decodeToken

        if (!isValidObjectId(userId)) return res.status(400).send({ status: false, message: "invalid user Id" })

        if (decodeToken.userId == userId)
            next()
        else return res.status(403).send({ status: false, message: "unauthorized.You are not authorize to perform the action." })

    }
    catch (error) {
        return res.status(500).send({ status: false, error: error.message })
    }
}

const adminAuthorization = async function (req, res, next) {

    try {

        let AdminId = req.params.adminId

        if (!isValidObjectId(AdminId)) return res.status(400).send({ status: false, message: "invalid Id" })

        let user = await userModel.findById({ _id: AdminId })
        let admin = await userModel.findOne({ name: "Admin" })

        if (user && admin && user._id.equals(admin._id))
            next()
        else return res.status(403).send({ status: false, message: "unauthorized.You are not authorize to perform the action." })

    }
    catch (error) {
        return res.status(500).send({ status: false, error: error.message })
    }
}

module.exports.authentication = authentication
module.exports.authorization = authorization
module.exports.adminAuthorization = adminAuthorization