import * as dotenv from "dotenv";
dotenv.config("../.env");

import http from "node:http";
import app from "../src/app.js";

const main = (() => {
    
    'use strict';

    const server = http.createServer(app);

    const port = process.env.PORT
    const host = process.env.HOST

    server.listen(port, () => {
        console.log(`Server running from ${host} port ${port}`);
    })

    // process.on('unhandledRejection', (error) =>{
    //     console.error('unhandledRejection', error.message)
    // })

})()
