import express from "express";
import organizationRouter from "./organization.js";

const router = express.Router();

router.use("/api/v1", organizationRouter);

export default router;
