import fs from 'fs/promises'
import {type ArtPicture, type User } from './types.ts'


async function readFromFIle(path: string) {
    try {
        return await fs.readFile(path, "utf8").then(d =>JSON.parse(d))
    } catch(error) {
        await writeToFile(path, [])
        return []
    }
}

function writeToFile(path: string, data: ArtPicture[] | User[]) {
    return fs.writeFile(path, JSON.stringify(data, null, 2))
}

export {readFromFIle, writeToFile}