import prisma from "./helper.js";

export const registerHandler = async (registrationData) => {
  try {
    const { organization, user } = registrationData;

    const registered = await prisma.user.create({
      include: {
        organisation: true,
      },
      data: {
        ...user,
        organisation: {
          create: {
            name: organization,
          },
        },
      },
    });

    return {
      success: true,
      message: "Owner and organisation registered successfully.",
      data: registered,
    };
  } catch (err) {
    return {
      success: false,
      message: "Error occurred, unable to register user",
      err,
    };
  }
};
