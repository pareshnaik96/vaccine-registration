import { Request, Response } from "express"

export const getLogin = (_req: Request, res: Response) => {
    console.log("HIIIIIIIIIII")
    res.status(200).send({ status: 'OK', message: "===========================" })
}

export const postLogin = (req, res) => {
    console.log("REQ=BODY:     ", req.body)
    console.log("=========POSTINGGGG============")
    res.status(200).send({ status: 'OK', message: "duly noted" })
}

export const postPOSTLogin = (req, res) => {
    console.log("====================")
    console.log("REQ.PARAMS:  ", req.params)
    console.log("====================")

    res.status(200).send({ status: 'OK', message: "KUDOS" })
}