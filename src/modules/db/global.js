import prisma from "./helper.js";
import bcrypt from "bcrypt";

export const registerHandler = async (registrationData) => {
  try {
    const { organization, user } = registrationData;

    const hash = await bcrypt.hashSync(user?.password, 10);

    const registered = await prisma.user.create({
      include: {
        organisation: true,
      },
      data: {
        ...user,
        password: hash,
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
