import PrismaClient from "@prisma/client";

export const updateOrganisationHandler = async (prisma, id, organisationData) => {

  const updatedOrganisation = await prisma.organisation.update({
    where: {
      id,
    },
    data: organisationData,
  });

  console.log(updatedOrganisation)

  return updatedOrganisation != null
    ? {
        success: true,
        message: "Updated organisation",
        data: updatedOrganisation,
      }
    : {
        success: false,
        message: "Nothing to update",
        data: organisationData,
      };
};
