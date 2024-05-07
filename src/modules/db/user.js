import prisma from "./helper.js";

export const createUserByOrganisationByHandler = async (
  organizationId,
  userData
) =>
  await prisma.user
    .create({
      data: {
        organisation_id: organizationId,
        ...userData,
      },
    })

    .then((createdUser) =>
      createdUser != null
        ? {
            success: true,
            message: "Created User",
            data: createdUser,
          }
        : {
            success: false,
            message: "Unable to create user, or exists already",
            data: createdUser,
          }
    )

    .catch((err) => ({
      success: false,
      message: "Error occurred, unable to create a user",
      err,
    }));

export const getAllUsersHandler = async () =>
  await prisma.user
    .findMany()
    .then((users) =>
      users.length === 0
        ? {
            success: true,
            message: "No users found, should probably add some.",
            data: users,
          }
        : {
            success: true,
            message: "Found the following users",
            data: users,
          }
    )

    .catch((err) => ({
      success: false,
      message: "Error occurred, unable to find users",
      err,
    }));

export const getUserByEmailAddressHandler = async (emailAddress) =>
  await prisma.user
    .findUnique({
      where: {
        email: emailAddress,
      },
    })

    .then((foundUser) =>
      foundUser != null
        ? {
            success: true,
            message: "Found user",
            data: foundUser,
          }
        : {
            success: false,
            message: "Unable to find user",
            data: foundUser,
          }
    )

    .catch((err) => ({
      success: false,
      message: "Error occurred, unable to find user",
      err,
    }));
