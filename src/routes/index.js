import express from "express";
import organizationRouter from "./organization.js";
import userRouter from "./user.js";
import systemRouter from "./global.js";

const router = express.Router();

const routes =  [systemRouter, organizationRouter, userRouter]

router.use("/api/v1", routes);

export default router;
