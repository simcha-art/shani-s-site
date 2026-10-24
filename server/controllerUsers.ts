import { repo } from "./usersRepo.ts";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express'
import _env from 'dotenv/config'
import type { MyError, User } from "./types.ts";
const JWT_SECRET = process.env.JWT_SECRET as string
const JWT_SECRET_REFRESH = process.env.JWT_SECRET_REFRESH as string

async function login(req: Request, res: Response, next: NextFunction) {
    const { name, password } = req.body;
    const user = await repo.getUserByNameAndPwd(name.trim().toLowerCase(), password.trim())
    const payload = { id: user.id, name: user.name, role: user.role, email: user.email, phone: user.phone }
    const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" })
    const refreshToken = jwt.sign(payload, JWT_SECRET_REFRESH, {expiresIn: "7d"})
    res.cookie("refreshToken", refreshToken, { httpOnly: true })
    res.json({ accessToken })
}

async function register(req: Request, res: Response, next: NextFunction) {
    const { name, email, phone, password } = req.body;
    const newUser: User = { id: -1, name, email, phone, password: await bcrypt.hash(password, 10), role: "user" }
    await repo.createUser(newUser)
    next()
}

async function refresh(req: Request, res: Response, next: NextFunction) {
    try {
        const  refreshToken  = req.cookies.refreshToken
        const payload = jwt.verify(refreshToken, JWT_SECRET_REFRESH)
        const newAccessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" })
        res.json({ accessToken: newAccessToken })
    } catch (error) {
        console.log(error)
        const err: MyError = new Error("Invalid or expired token")
        err.status = 401
        throw err
    }
}

export { login, register, refresh }
