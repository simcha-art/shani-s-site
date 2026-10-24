import { Router } from "express";
import { login, refresh, register } from "./controllerUsers.ts";

export const router = Router()

router.post("/login", login)

router.post('/register', register, login)

router.post("/refresh", refresh)