import express from "express";
import organizationRouter from "./organization.js";
import userRouter from "./user.js";

const router = express.Router();

router.use("/api/v1", [organizationRouter, userRouter]);

export default router;
