import bcrypt from "bcrypt";
import generator from "generate-password";
import {
  updateUserPasswordByEmailHandler,
  getUserByEmailAddressHandler,
  lockAccount
} from "./db/user.js";
import {
  comparePasswordAgainstHash,
  checkifAccountIsLocked,
} from "./authorisation/login.js";
import accountStateResolver from "./authorisation/resolver.js"

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

export const loginWithPassword = async (user) =>
  await getUserByEmailAddressHandler(user?.email)
    .then(checkifAccountIsLocked)
    .then(async (found) =>
      found?.success
        ? await comparePasswordAgainstHash(
            user?.password,
            found?.data?.password
          ).then(async (authenticated) =>
            authenticated?.success
              ? await lockAccount(accountStateResolver({...found?.data}, "UNLOCK"))
              : await lockAccount(accountStateResolver({...found?.data}, "LOCK"))
          )
        : found
    )

    .then((authenticated) => authenticated)
    .catch((err) => err);
