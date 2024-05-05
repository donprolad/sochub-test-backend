import express from "express";
import {
  authorizeToken
} from "../middleware/token.js"

import {
   getAllUsers
  } from "../controllers/user.js"

const userRouter = express.Router()

userRouter
  .use(authorizeToken)
  .route("/users")
  .get(getAllUsers)

export default userRouter