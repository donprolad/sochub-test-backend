import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import router from './routes/index.js'

const app = express()

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(router)


export default app

