import express from "express";
import { authorizeToken } from "../middleware/token.js";

import {
  getAllOrganisations,
  getOrganizationById,
  createOrganization,
  updateOrganizationById,
} from "../controllers/organization.js";

import {
  createUserByOrganizationId,
} from "../controllers/user.js";

const organisationRouter = express.Router();

organisationRouter
  .use(authorizeToken)
  .route("/organization")
  .get(getAllOrganisations)
  .post(createOrganization);

organisationRouter
  .use(authorizeToken)
  .route("/organization/:id")
  .get(getOrganizationById)
  .patch(updateOrganizationById);

organisationRouter
  .use(authorizeToken)
  .route("/organization/:id/user")
  .post(createUserByOrganizationId);

export default organisationRouter;
