import { PrismaClient } from "@prisma/client";

export const getOrganizationById = async (req, res) => {
  try {
    const prisma = new PrismaClient();
    const id = req?.params?.id;

    const foundOrganization = await prisma.organization.findUnique({
      where: {
        id: id,
      },
    });

    foundOrganization == null
      ? res.status(400).json({
          success: true,
          message: "Not found",
          data: {},
        })
      : res.status(200).json({
          success: true,
          message: "Found the following organization",
          data: foundOrganization,
        });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error occurred, unable to find organization",
      error,
    });
  }
};

export const createOrganization = async (req, res) => {
  try {
    const prisma = new PrismaClient();

    const { name } = req.body;

    const createOrganization = await prisma.organization.create({
      data: {
        name,
      },
    });

    res.status(200).json({
      success: true,
      message: "Found the following organization",
      data: createOrganization,
    });
  } catch (error) {
    res.status(400).json({
      success: true,
      message: "Error occurred, unable to create organization",
      error,
    });
  }
};
