import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import router from './routes/index.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(router)


export default app

