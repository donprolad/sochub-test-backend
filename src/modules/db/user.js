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

export const updateUserPasswordByEmailHandler = async (email, hash) =>
  await prisma.user
    .update({
      where: {
        email,
      },
      data: {
        password: hash,
      },
    })

    .then((updatedUser) =>
      updatedUser != null
        ? {
            success: true,
            message: "Updated user details",
            data: updatedUser,
          }
        : {
            success: false,
            message: "User not found",
            data: updatedUser,
          }
    )

    .catch((err) => ({
      success: false,
      message: "Error occurred, unable to update password.",
      err,
    }));

export const lockAccount = async (payload) =>
  await prisma.user
    .update(payload)
    .then((userLocked) =>
      userLocked?.failed_logins > 0
        ? {
            success: false,
            message: userLocked?.account_locked
              ? "Your account has been locked, please reset your password"
              : `Authentication failed, with ${userLocked?.failed_logins} login attempts.`,
            data: {
              account_locked: userLocked?.account_locked,
              failed_logins: userLocked?.failed_logins,
            },
          }
        : {
            success: true,
            message: "Authentication successful",
            data: {
              account_locked: userLocked?.account_locked,
              failed_logins: userLocked?.failed_logins,
            },
          }
    )

    .catch((err) => ({
      success: false,
      message: "Error occured, unable to lock or unlock the user account",
      err,
    }));
