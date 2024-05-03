import prisma from './helper.js'

export const getOrganizationById = async (req, res) => {
  try {
    const id = req?.params?.id;

    const foundOrganization = await prisma.organization.findUnique({
      where: {
        id,
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
      success: false,
      message: "Error occurred, unable to create organization",
      error,
    });
  }
};

export const updateOrganizationById = async (req, res) =>{
  try {

    const updatedOrganization = await prisma.organization.update({
      where: {
        id: req?.params?.id,
      },
      data: {
        ...req?.body,
      },
    });

    res.status(400).json({
      success: true,
      message: "Update organisation",
      data: updatedOrganization,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error occurred, unable to update organisation",
      error,
    });
  }
};
