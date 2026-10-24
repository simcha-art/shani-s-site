import type { Request, Response, NextFunction } from "express";
import { sendEmailForAdmin, sendEmailForUser, type ContactEmailData } from "./mailManager.ts"

export async function contact(req: Request, res: Response, next: NextFunction) {
    const {name, email, topic, question, theme } = req.body
    if (!name || !email || !topic || !question || !theme) {
        const err = new Error("All fields should be filled")
        err.status = 400
        throw err
    }

    const successAdmin = await sendEmailForAdmin({name, email, topic, question})
    const successUser = await sendEmailForUser({name, email, topic, question, theme})
    res.json({successAdmin, successUser})
}