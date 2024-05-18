import bcrypt from "bcrypt";
import crypto from "crypto";

import {
  updateUserPasswordByEmailHandler,
  getUserByEmailAddressHandler,
  lockAccount,
} from "./db/user.js";
import {
  comparePasswordAgainstHash,
  checkifAccountIsLocked,
} from "./authorisation/login.js";
import accountStateResolver from "./authorisation/resolver.js";


export const updateForgottenPassword = async (found) => {
  try {
    if (found?.success) {
      const temporaryPassword = crypto.randomBytes(32).toString("hex");

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
    .then(async (found) => await authenticateAndLockAccount(found, user))
    .then((authenticated) => authenticated)
    .catch((err) => err);

const authenticateAndLockAccount = async (found, user) =>
  found?.success
    ? await comparePasswordAgainstHash(user?.password,found?.data?.password)
      .then(async (authenticated) => authenticated?.success
          ? await lockAccount(accountStateResolver({ ...found?.data }, "UNLOCK"))
          : await lockAccount(accountStateResolver({ ...found?.data }, "LOCK"))
      )
    : found;
