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

export const incrementLockCount = async (user) =>
  await prisma.user
    .update({
      where: {
        email: user?.data?.email,
      },
      data: {
        account_locked: user?.data?.failed_logins < 2 ? false : true,
        failed_logins: user?.data.failed_logins + 1,
      },
    })

    .then((userToBeLocked) => ({
      success: false,
      message: `Authentication failed, will lock on 3 failed attempts.`,
      data: {
        failed_logins: userToBeLocked?.failed_logins,
        account_locked: userToBeLocked?.account_locked,
      },
    }))

    .catch((err) => {
      console.log(err)({
        success: false,
        message: "Error occurred",
        err,
      });
    });

export const resetLockCount = async (user) =>
  await prisma.user
    .update({
      where: {
        email: user?.data?.email,
      },
      data: {
        account_locked: false,
        failed_logins: 0,
      },
    })

    .then((userToBeUnLocked) => ({
      success: true,
      message: `Authentication successful`,
      data: {
        failed_logins: userToBeUnLocked?.failed_logins,
        account_locked: userToBeUnLocked?.account_locked,
      },
    }))

    .catch((err) => {
      console.log(err)({
        success: false,
        message: "Error occurred, unable to unlock account",
        err,
      });
    });
