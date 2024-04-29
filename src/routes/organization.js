import express from "express";
import {
  getOrganizationById,
  createOrganization,
} from "../controllers/organization.js";

const organisationRouter = express.Router();

organisationRouter.route("/organization").post(createOrganization);

organisationRouter.route("/organization/:id").get(getOrganizationById);

export default organisationRouter;
