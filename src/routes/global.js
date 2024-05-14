import express from "express";
import { getToken } from "../middleware/token.js";
import {
  login,
  register,
  forgotPassword,
  resetPassword,
} from "../controllers/global.js";

import {
  passwordSchema,
  registrationSchema,
  forgottenPasswordSchema,
  resetPasswordSchema
} from "../middleware/guards/schemas.js";
import { guard } from "../middleware/guards/helper.js";

const systemRouter = express.Router();

// systemRouter.route("/token").post(getToken); // This will be removed, once login works
systemRouter.route("/register").post(guard(registrationSchema),register);
systemRouter.route("/login").post(guard(passwordSchema), login, getToken);
systemRouter
  .route("/forgot_password")
  .post(guard(forgottenPasswordSchema), forgotPassword);
systemRouter.route("/reset_password").post(guard(resetPasswordSchema), resetPassword);

export default systemRouter;
