import { PrismaClient } from "@prisma/client";

// export const registerUser = async(req, res) => {
//   try {
//     const prisma = new PrismaClient()


//   } catch (err) {

//   }
// }

export const getOrganization = async (req, res, next) => {
  try {
    const prisma = new PrismaClient();
    const id = req?.params?.id;

    const foundOrganization = await prisma.organization.findUnique({
      where: {
        id,
      },
    });

    if (foundOrganization?.id == null) {

      res.status(400).json({
        success: true,
        message: "Not found",
        data: foundOrganization,
      });

    } else {

      res.locals.prisma = prisma;
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
    const createdUser = await res?.locals?.prisma.user.create({
      data: {
        organisation_id: res?.locals?.organisation.id,
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

export const getAllUsers = async (req, res) => {
  try {
    const prisma = new PrismaClient();
    const allUsers = await prisma.user.findMany();

    allUsers.length === 0
      ? res.status(200).json({
          success: true,
          message: "No users found, should probably add some",
          data: allUsers,
        })
      : res.status(200).json({
          success: true,
          message: "Found the following users",
          data: allUsers,
        });
  } catch (error) {
    
    res.status(400).json({
      success: false,
      message: "Error occurred, unable to find users",
      error,
    });
  }
};