import express from "express";
import {
   getAllUsers
  } from "../controllers/user.js"

const userRouter = express.Router()

userRouter.route("/users").get(getAllUsers)

export default userRouter