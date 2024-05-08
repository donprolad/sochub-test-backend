import express from "express";
import { getToken } from "../middleware/token.js";
import {
  login,
  register,
  forgotPassword,
  resetPassword,
} from "../controllers/global.js";

import { loginGuard } from '../middleware/guards/password.js'


const systemRouter = express.Router();

// systemRouter.route("/token").post(getToken); // This will be removed, once login works
systemRouter.route("/register").post(register);
systemRouter.route("/login").post(loginGuard, login, getToken);
systemRouter.route("/forgot_password").post(forgotPassword);
systemRouter.route("/reset_password").post(resetPassword);

export default systemRouter;
