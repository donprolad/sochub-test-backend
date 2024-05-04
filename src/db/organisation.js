import prisma from "./helper.js";

export const getOrganizationByIdHandler = async (id) =>
  await prisma.organization
    .findUnique({
      where: {
        id,
      },
    })

    .then((foundOrganization) =>
      foundOrganization == null
        ? {
            success: false,
            message: "Not found",
            data: {},
          }
        : {
            success: true,
            message: "Found the following organization",
            data: foundOrganization,
          }
    )

    .catch((err) => ({
      success: false,
      message: "Error occurred, unable to find organisation",
      err,
    }));

export const createOrganisationHandler = async (name) =>
  await prisma.organization
    .create({
      data: {
        ...name,
      },
    })

    .then((newOrganisation) =>
      newOrganisation != null
        ? {
            success: true,
            message: "Created new organisation",
            data: newOrganisation,
          }
        : {
            success: false,
            message: "Unable to create organisation, or exists already",
            data: newOrganisation,
          }
    )

    .catch((err) => ({
      success: false,
      message: "Error occurred, unable to create an organisation",
      err,
    }));

export const updateOrganisationByIdHandler = async (id, organisationData) =>
  await prisma.organization
    .update({ where: { id }, data: { ...organisationData } })
    .then((updatedOrganisation) =>
      updatedOrganisation != null
        ? {
            success: true,
            message: "Updated organisation",
            data: updatedOrganisation,
          }
        : {
            success: false,
            message: "Nothing to update",
            data: updatedOrganisation,
          }
    )
    .catch((err) => ({
      success: false,
      message: "Error occurred, unable to update organisation.",
      err,
    }));
