import * as dotenv from 'dotenv'
dotenv.config("../.env")

import http from 'node:http'
import https from 'node:https'
import fs from 'fs'
import app from '../src/index.js'


const server = http.createServer(app)

server.listen(3000, () => {
    console.log(`Server running on localhost port 3000`)
})