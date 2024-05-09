import bcrypt from "bcrypt";
import generator from "generate-password";
import { updateUserPasswordByEmailHandler } from "./db/user.js";

export const updateForgottenPassword = async (found) => {
  try {
    if (found?.success) {
      const temporaryPassword = generator.generate({
        length: 32,
        symbols: true,
        numbers: true,
        lowercase: true,
        uppercase: true,
      });

      const hash = await bcrypt.hashSync(temporaryPassword, 10);

      const updatedUser = await updateUserPasswordByEmailHandler(
        found?.data?.email,
        hash
      );

      return updatedUser?.success
        ? {
            success: true,
            message: "This should be mailed",
            data: {
              redirect_url: `http://localhost:3000/api/v1/reset_password?reset=${encodeURI(
                temporaryPassword
              )}`,
            },
          }
        : updatedUser;
    } else {
      return found;
    }
  } catch (err) {
    return {
      success: false,
      message: "Error occurred, unable update password",
      err,
    };
  }
};
