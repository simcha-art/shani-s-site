import { type ArtPicture } from "./types.ts"
import { readFromFIle, writeToFile } from "./io.ts"
import _env from 'dotenv/config'

const FILEPATH = process.env.FILE_PATH_ARTS as string

function generateId<T extends {id: number}>(array: T[]) {
    const maxId = Math.max(0, ...array.map(item => item.id))
    const newId = maxId + 1
    return newId
}

export const repo = {
    getArts: () => readFromFIle(FILEPATH),
    getArtById: async (id: number) => {
        const arts: ArtPicture[] = await readFromFIle(FILEPATH)
        return arts.find(art => art.id === id)
    },
    getArtBySlug: async (slug: string) => {
        const arts: ArtPicture[] = await readFromFIle(FILEPATH)
        return arts.find(art => art.slug === slug)
    },
    createNewArt: async (newArt: ArtPicture) => {
        const arts: ArtPicture[] = await readFromFIle(FILEPATH)
        newArt.id = generateId(arts)
        arts.push(newArt)
        return writeToFile(FILEPATH, arts)
    },
    updateArt: async (id: number, updatedArt: ArtPicture) => {
        const arts: ArtPicture[] = await readFromFIle(FILEPATH)
        const updated = arts.map(art => {
            if (art.id === id) {
                return updatedArt
            }
            return art
        })
        return writeToFile(FILEPATH, updated)
    }
}