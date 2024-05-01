import express from "express";
import {
  getOrganizationById,
  createOrganization,
  updateOrganizationById
} from "../controllers/organization.js";

import {
  getOrganization,
  createUserByOrganizationId
} from "../controllers/user.js"

const organisationRouter = express.Router();

organisationRouter.route("/organization").post(createOrganization);

organisationRouter
  .route("/organization/:id")
  .get(getOrganizationById)
  .patch(updateOrganizationById);

organisationRouter
  .route("/organization/:id/user")
  .post(getOrganization, createUserByOrganizationId)
export default organisationRouter;
