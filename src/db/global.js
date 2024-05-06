import prisma from "./helper.js";

export const registerHandler = async (registrationData) => {
  try {
    const { organization, user } = registrationData;
    const registered = await prisma.user.create({
      include: {
        organization: {
          create: {
            name: organization?.name,
          },
        },
        userrole: {
          create: {
            name: "owner",
          },
        },
      },
      data: {
        ...user,
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
