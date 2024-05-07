import { registerHandler } from "../modules/db/global.js";
import { getUserByEmailAddressHandler } from "../modules/db/user.js";
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
    .then((foundUser) => foundUser)
    .then(async (found) =>
      found?.success
        ? await bcrypt.compare(
            req.body?.password,
            found?.data?.password,
            (err, found) =>
              found === true
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
  await res.status(200).json({ success: true, message: "To be implemented" });

export const resetPassword = async (req, res) =>
  await res.status(200).json({ success: true, message: "To be implemented" });
