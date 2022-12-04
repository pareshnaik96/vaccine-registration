import userModel from "../Models/userModel";
import * as bcrypt from "bcrypt";
import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express'
import { IUser } from "service"


//======================================= validation ====================================//

const isValid = function (value: string | number) {
    if (typeof value == "undefined" || value == null) return false;
    if (typeof value == "string" && value.trim().length == 0) return false;
    return true;
};

const isvalidRequestBody = function (requestbody: string | number) {
    return Object.entries(requestbody).length > 0;
}

const isValid1 = function (phone: number) {
    let phoneRegex = /^[789]\d{9}$/;
    return phoneRegex.test(String(phone))
};


//============================================== create user controller ===================================================//


const createUser = async function (req: Request, res: Response) {

    try {

        let data: IUser = req.body
        // console.log(data)

        if (!isvalidRequestBody(data)) {
            return res.status(400).send({ status: false, message: "please enter required fields" });
        }

        let { role, name, phoneNumber, age, pincode, aadharNo } = data;
        let password: IUser = data.password

        //--------------------------------- validation ---------------------------------------------//


        if (role === "") return res.status(400).send({ status: false, message: "role is not empty" })

        if (role) {
            if (!['user'].includes(role)) {
                return res.status(400).send({ status: false, message: "please enter role as 'user'" });
            }
        }

        if (!isValid(name)) {
            return res.status(400).send({ status: false, message: "name is required" });
        }

        if (!(/^[a-zA-Z]+[\-'\s]?[a-zA-Z ]+$/).test(name)) {
            return res.status(400).send({ status: false, message: "please enter a valid Name" });
        }

        if (!isValid(phoneNumber)) {
            return res.status(400).send({ status: false, message: "phoneNumber is required" });
        }

        if (phoneNumber) {
            console.log(phoneNumber)
            let uniquePhone = await userModel.findOne({ phoneNumber })
            console.log(uniquePhone)

            if (uniquePhone) {
                return res.status(400).send({ status: false, message: "phoneNumber already exist" });
            }
        }

        if (!isValid1(phoneNumber)) {
            return res.status(400).send({ status: false, message: "please enter a valid phoneNumber" });
        }

        if (!isValid(age)) {
            return res.status(400).send({ status: false, message: "age is required" });
        }

        if (!Number(age)) return res.status(400).send({ status: false, message: "please enter valid age" })

        if (Number(age) <= 0) return res.status(400).send({ status: false, message: "age is not valid" })

        if (!isValid(pincode)) {
            return res.status(400).send({ status: false, message: "pincode is required" });
        }

        if (!/^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/.test(pincode)) {
            return res.status(400).send({ status: false, message: "pincode is invalid" });
        }

        if (!isValid(aadharNo)) {
            return res.status(400).send({ status: false, message: "aadharNo is required" });
        }

        if (!/^[0-9]{4}[ -]?[0-9]{4}[ -]?[0-9]{4}$/.test(aadharNo)) {
            return res.status(400).send({ status: false, message: "aadharNo. is not valid" });
        }

        if (!isValid(password)) {
            return res.status(400).send({ status: false, message: " password is required" });
        }

        if (password.length < 8 || password.length > 15) {
            return res.status(400).send({ status: false, message: "password must be 8-15 characters" });
        }

        //------------ encrypted password --------------
        const saltRounds = 10
        password = await bcrypt.hash(password, saltRounds);


        const saveData = {
            role: role,
            name: name,
            phoneNumber: phoneNumber,
            age: age,
            pincode: pincode,
            aadharNo: aadharNo,
            password: password
        }


        let createUser = await userModel.create(saveData)
        return res.status(201).send({ status: true, message: "User created successfully", data: createUser });

    } catch (error: any) {
        return res.status(500).send({ status: false, message: error.message });
    }
}


//============================================ Login user controller ============================================================//


const login = async function (req: Request, res: Response) {

    try {

        let phoneNumber: IUser = req.body.phoneNumber;
        let password: IUser = req.body.password;

        if (!phoneNumber) {
            return res.status(400).send({ status: false, message: "phone number is required" });
        }

        if (!password) {
            return res.status(400).send({ status: false, message: "password is required" });
        }

        if (!isValid1(phoneNumber)) {
            return res.status(400).send({ status: false, message: "please enter valid phone number" });
        }

        const checkedUser = await userModel.findOne({ phoneNumber });
        if (!checkedUser) {
            return res.status(404).send({ status: false, message: "No user with this number" });
        }

        let userId = checkedUser._id.toString()

        const match = await bcrypt.compare(password, checkedUser.password);
        if (!match) {
            return res.status(400).send({ status: false, message: "password wrong" });
        }

        //To create token
        let token = jwt.sign({
            userId: userId,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 10 * 60 * 60
        }, "vaccine@key");

        res.setHeader("x-api-key", token);
        return res.status(200).send({ status: true, message: "user login sucessfull", data: token })

    }
    catch (error: any) {
        return res.status(500).send({ status: false, message: "Error", error: error.message })
    }
}



export { createUser, login };