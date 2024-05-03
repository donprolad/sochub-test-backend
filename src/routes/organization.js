import express from "express";
import { authorizeToken } from "../middleware/token.js";

import {
  getOrganizationById,
  createOrganization,
  updateOrganizationById,
} from "../controllers/organization.js";

import {
  getOrganization,
  createUserByOrganizationId,
} from "../controllers/user.js";

const organisationRouter = express.Router();

organisationRouter
  .use(authorizeToken)
  .route("/organization")
  .post(createOrganization);

organisationRouter
  .use(authorizeToken)
  .route("/organization/:id")
  .get(getOrganizationById)
  .patch(updateOrganizationById);

organisationRouter
  .use(authorizeToken)
  .route("/organization/:id/user")
  .post(getOrganization, createUserByOrganizationId);

export default organisationRouter;
