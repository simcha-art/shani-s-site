import { repo } from "./artsRepo.ts"
import z, { number } from 'zod'


const ArtSchema = z.object({
    id: z.number(),
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    height: z.number(),
    width: z.number(),
    materials: z.array(z.string()),
    isCopied: z.boolean(),
    price: z.number(),
    isInStore: z.boolean(),
    image: z.string(),
})

async function getArts(req, res, next) {
    try {
        res.send(await repo.getArts())
    } catch (error) {
        next(error)
    }
}

async function getArtByIdOrSlug(req, res, next) {
    try {
        const {idOrSlug} = req.params
        let art;
        if (Number(idOrSlug)) art = await repo.getArtById(+idOrSlug)
        else if (idOrSlug) art = await repo.getArtBySlug(idOrSlug)
        if (!art) {
            const err = new Error("not found")
            err.status = 404
            throw err
        }
        res.send(art)
    } catch (error) {
        next(error)
    }
}


async function createNewArt(req, res, next) {
    try {
        req.body.id = -1
        const result = ArtSchema.safeParse(req.body)
        if (result.success) {
            await repo.createNewArt(result.data)
            return res.status(201).json({ success: true })
        }
        else {
            const err = new Error("invalid data, try again")
            err.status = 400
            throw err
        }
    } catch (error) {
        next(error)
    }
}

async function updateArt(req, res, next) {
    try {

        const id = Number(req.params.id)
        const result = ArtSchema.safeParse(req.body)
        let err;
        if (!id) {
            err = new Error("You must give an id")
            err.status = 400
            throw err
        }
        if (!result.success) {
            err = new Error("Invalid updated data")
            err.status = 400
            throw err
        }

        await repo.updateArt(id, result.data)
        res.json({ success: true })
    } catch (error) {
        next(error)
    }
}

export { getArts, getArtByIdOrSlug, createNewArt, updateArt }