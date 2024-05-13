import { registerHandler } from "../modules/db/global.js";
import { getUserByEmailAddressHandler } from "../modules/db/user.js";
import {
  updateForgottenPassword,
  resetPasswordHandler,
} from "../modules/auth.js";
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
  await getUserByEmailAddressHandler(req.body?.email)
    .then(async (found) =>
      found?.success
        ? await bcrypt.compare(
            req.body?.password,
            found?.data?.password,
            (err, authenticated) =>
              authenticated === true
                ? next()
                : res.status(400).json({
                    success: false,
                    message: "Authentication failed",
                    err,
                  })
          )
        : res.status(400).json(found)
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
    .then((found) => {
      return resetPasswordHandler(found, req?.query?.reset, req?.body?.password)
    })
    .then((reset) =>
      reset?.success 
      ? res.status(201).json(reset) 
      : res.status(400).json(reset)
    )
    .catch((err) => res.status(400).json(err));
