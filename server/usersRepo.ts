import _env from 'dotenv/config';
import bcrypt from 'bcrypt'
import type { User, MyError } from './types.ts';
import { readFromFIle, writeToFile } from './io.ts';

const FILEPATH = process.env.FILE_PATH_USERS as string

export const repo = {
    createUser: async (user: User) => {
        const users: User[] = await readFromFIle(FILEPATH)
        const lastId = Math.max(0, ...users.map(u => u.id))
        user.id = lastId + 1
        users.push(user)
        await writeToFile(FILEPATH, users)
    }, 
    updateUser: async (user: User) => {
        const users: User[] = await readFromFIle(FILEPATH)
        const userToUpdate = users.find(u => u.id === user.id)
        if (!userToUpdate) {
            const err: MyError = new Error("user not found")
            err.status = 404
            throw err
        }
        Object.assign(userToUpdate, user)
        await writeToFile(FILEPATH, users)
    },
    getUserByNameAndPwd: async (name: string, password: string) => {
        const users: User[] = await readFromFIle(FILEPATH)
        let user;
        for (let u of users) {
            if (u.name === name && await bcrypt.compare(password, u.password)) {
                user = u;
                break
            }
        }

        console.log(user)
        if (!user) {
            const err: MyError = new Error("not found")
            err.status = 404
            throw err
        }
        return user
    },
    getAllUsers: () => {
        return readFromFIle(FILEPATH)
    }
}