import type { Request, Response, NextFunction } from "express"
import { type MyError } from "./types.ts"
import jwt from 'jsonwebtoken'
import _env from "dotenv/config"

function logger(req: Request, res: Response, next: NextFunction) {
    console.log(`url: ${req.url} | body: `, req.body, "query: ", req.query)
    next()
}

function errorHandler(err: MyError, req: Request, res: Response, next: NextFunction) {
    console.log(err)
    const status = err.status || 500
    const msg = err.message || "Internal Server Error"
    res.status(status).json({ err: msg })
}

function authentication(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader) {
            const err: MyError = new Error("You must add authentication")
            err.status = 401
            throw err
        }
        const token = authHeader.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
        req.user = decoded
        next()
    } catch (error) {
        console.log(error.message)
        const err: MyError = new Error("invalid or expired token")
        err.status = 401
        throw err
    }
}




function adminAuth(req: Request, res: Response, next: NextFunction) {
    try {
        if (req.user.role !== "admin") {
            const err: MyError = new Error("unAutorized")
            err.status = 403
            throw err
        }
        next()
    } catch (error) {
        next(error)
    }
}

export { logger, errorHandler, authentication, adminAuth }