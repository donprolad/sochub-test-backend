import express from "express";
import { getToken } from "../middleware/token.js";

const systemRouter = express.Router();

systemRouter.route("/token").post(getToken);

export default systemRouter;
