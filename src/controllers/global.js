import { registerHandler } from "../modules/db/global.js";
import {
  getUserByEmailAddressHandler,
  updateUserPasswordByEmailHandler,
  resetLockCount,
} from "../modules/db/user.js";
import { updateForgottenPassword, loginWithPassword } from "../modules/auth.js";
import bcrypt from "bcrypt";

export const register = async (req, res) =>
  await registerHandler(req?.body)
    .then((registered) =>
      registered?.success
        ? res.status(201).json(registered)
        : res.status(400).json(registered)
    )
    .catch((err) => res.status(400).json(err));

export const login = async (req, res, next) =>
  await loginWithPassword(req?.body)
    .then((authenticated) =>
      authenticated.success ? next() : res.status(400).json(authenticated)
    )
    .catch((err) => res.status(400).json(err));

export const forgotPassword = async (req, res) =>
  await getUserByEmailAddressHandler(req?.body?.email)
    .then(updateForgottenPassword)

    .then((updated) =>
      updated?.success
        ? res.status(201).json(updated)
        : res.status(400).json(updated)
    )

    .catch((err) => res.json(400).json(err));

export const resetPassword = async (req, res) =>
  await getUserByEmailAddressHandler(req?.body.email)
    .then(async (found) =>
      found?.success
        ? (await bcrypt.compare(req.query?.reset, found?.data?.password))
          ? {
              success: true,
              message: "Authentication successful",
            }
          : {
              success: false,
              message: "Authentication failed",
            }
        : found
    )

    .then(async (passwordCanBeReset) =>
      passwordCanBeReset.success
        ? {
            success: true,
            message: "Password updated",
            data: await bcrypt.hashSync(req.body.password, 10),
          }
        : passwordCanBeReset
    )

    .then(async (hashed) =>
      hashed?.success
        ? await updateUserPasswordByEmailHandler(
            req?.body?.email,
            hashed?.data
          ).then(async (updated) =>
            updated?.success ? await resetLockCount(updated) : updated
          )
        : hashed
    )

    .then((updated) =>
      updated?.success
        ? res.status(201).json(updated)
        : res.status(400).json(updated)
    )

    .catch((err) => res.status(400).json(err));
