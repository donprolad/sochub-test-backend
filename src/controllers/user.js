import prisma from "../db/helper.js";
import { getAllUsersHandler } from "../db/user.js";

export const getOrganization = async (req, res, next) => {
  try {
    const id = req?.params?.id;

    const foundOrganization = await prisma.organization.findUnique({
      where: {
        id,
      },
    });

    if (foundOrganization?.id == null) {
      res.status(200).json({
        success: true,
        message: "Not found",
        data: foundOrganization,
      });
    } else {
      res.locals.organisation = foundOrganization;

      next();
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error occurred, unable to find organization",
      error,
    });
  }
};

export const createUserByOrganizationId = async (req, res) => {
  try {
    const { organisation } = res?.locals;

    const createdUser = await prisma.user.create({
      data: {
        organisation_id: organisation?.id,
        ...req?.body,
      },
    });

    res.status(200).json({
      success: true,
      message: "Created User",
      data: createdUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to create user",
      error,
    });
  }
};

export const getAllUsers = async (_, res) =>
  await getAllUsersHandler()
    .then((users) =>
      users?.success ? res.status(200).json(users) : res.status(400).json(users)
    )
    .catch((err) => res.status(400).json(err));
