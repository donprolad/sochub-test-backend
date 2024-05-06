import {
  getAllOrganisationsHandler,
  getOrganizationByIdHandler,
  updateOrganisationByIdHandler,
  createOrganisationHandler,
} from "../db/organisation.js";

export const getAllOrganisations = async (_, res) =>
  await getAllOrganisationsHandler()
    .then((found) =>
      found?.success ? res.status(200).json(found) : res.status(400).json(found)
    )
    .catch((err) => res.status(400).json(err));
    
export const getOrganizationById = async (req, res) =>
  await getOrganizationByIdHandler(req?.params?.id)
    .then((found) =>
      found?.success ? res.status(200).json(found) : res.status(400).json(found)
    )
    .catch((err) => res.status(400).json(err));

export const createOrganization = async (req, res) =>
  await createOrganisationHandler(req?.body)
    .then((created) =>
      created?.success
        ? res.status(201).json(created)
        : res.status(400).json(created)
    )
    .catch((err) => res.status(400).json(err));

export const updateOrganizationById = async (req, res) =>
  await updateOrganisationByIdHandler(req?.params?.id, req?.body)
    .then((data) =>
      data?.success ? res.status(201).json(data) : res.status(400).json(data)
    )
    .catch((err) => res.status(400).json(err));
