import {
  getAllUsersHandler,
  createUserByOrganisationByHandler,
} from "../modules/db/user.js";
import { getOrganizationByIdHandler } from "../modules/db/organisation.js";

export const createUserByOrganizationId = async (req, res) =>
  await getOrganizationByIdHandler(req?.params?.id)
    .then((foundOrganization) =>
      foundOrganization?.success
        ? createUserByOrganisationByHandler(
            foundOrganization?.data?.id,
            req?.body
          )
        : res.status(400).json(foundOrganization)
    )

    .then((createdUser) =>
      createdUser.success
        ? res.status(201).json(createdUser)
        : res.status(400).json(createdUser)
    )

    .catch((err) => res.status(400).json(err));

export const getAllUsers = async (_, res) =>
  await getAllUsersHandler()
    .then((users) =>
      users?.success ? res.status(200).json(users) : res.status(400).json(users)
    )
    .catch((err) => res.status(400).json(err));


