import prisma from "./helper.js";

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
