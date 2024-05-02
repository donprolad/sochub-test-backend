import express from "express";
import {
  authorizeToken
} from "../middleware/token.js"

import {
   getAllUsers
  } from "../controllers/user.js"

const userRouter = express.Router()

userRouter.route("/users").get(authorizeToken, getAllUsers)

export default userRouter