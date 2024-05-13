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

      console.log(temporaryPassword);

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

export const resetPasswordHandler = async (found, resetToken, newPassword) => {
  try {
    if (found?.success) {
      const hash = await bcrypt.hashSync(newPassword, 10);

      return await bcrypt.compare(
        resetToken,
        found?.data?.password,
        async (err, authenticated) => {
          if (authenticated === true) {
            const updatedUser = await updateUserPasswordByEmailHandler(
              found?.data?.email,
              hash
            );

            return updatedUser.success ? updatedUser : updatedUser;
          } else {
            return {
              success: false,
              message: "Authentication failed.",
              err,
            };
          }
        }
      );
    } else {
      return found;
    }
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Error occurred, unable to reset password",
      err,
    };
  }
};