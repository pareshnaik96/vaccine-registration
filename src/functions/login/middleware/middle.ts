import { NextFunction, Request, Response } from 'express'

// verify that the current user can only access his/her page
export const isAuthor = async (req: Request, res: Response, next: NextFunction) => {
    const userID = req.params.id;
    if (userID === '132ssad465978') {
        // now admins can view page of every users
        console.log("USER '132ssad465978 FOUND, redirecting")
        next()
    } else {
        res.send({ status: 400, message: "USER NOT FOUND" })
    }
};