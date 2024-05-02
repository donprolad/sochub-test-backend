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
  .route("/organization")
  .post(authorizeToken, createOrganization);

organisationRouter
  .route("/organization/:id")
  .get(authorizeToken, getOrganizationById)
  .patch(authorizeToken, updateOrganizationById);

organisationRouter
  .route("/organization/:id/user")
  .post(authorizeToken, getOrganization, createUserByOrganizationId);

export default organisationRouter;
