import express from 'express'
import cors from 'cors'
import _env from 'dotenv/config'
import { errorHandler, logger } from './middleware.ts'
import { router as artsRouter } from './artsRouter.ts'
import { router as authRouter } from './authRouter.ts'
import cookieParser from 'cookie-parser'
import { contact } from './contactController.ts'

const PORT = process.env.PORT

const app = express()

app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true
}))

app.use(cookieParser())


app.use(express.json())
app.use(logger)

app.use("/", authRouter)
app.use("/arts", artsRouter)
app.post("/contact", contact)


app.use(errorHandler)

app.listen(PORT, () => console.log(`listening to port: ${PORT}`))