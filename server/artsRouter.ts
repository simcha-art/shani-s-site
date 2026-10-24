import {Router} from "express";
import { createNewArt, getArtByIdOrSlug, getArts, updateArt } from "./controllerArts.ts";
import { authentication, adminAuth } from "./middleware.ts";

export const router = Router()

router.post("/", authentication, adminAuth, createNewArt)
router.patch("/:id", authentication, adminAuth, updateArt)
router.get("/", getArts)
router.get("/:idOrSlug", getArtByIdOrSlug)

