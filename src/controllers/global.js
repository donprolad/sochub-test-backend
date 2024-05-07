import { registerHandler } from "../modules/db/global.js";

import prisma from '../modules/db/helper.js'
import bcrypt from 'bcrypt'

export const register = async (req, res) =>
  await registerHandler(req?.body)
    .then((registered) =>
      registered?.success
        ? res.status(201).json(registered)
        : res.status(400).json(registered)
    )
    .catch((err) => res.status(400).json(err));

export const login = async (req, res, next) => {
  const { password, email } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user == null) {
    return res.status(400).json({
      success: false,
      message: "User does not exist.",
    });
  } else {
    return await bcrypt.compare(password, user?.password, (err, found) => {
      found
        ? next()
        : res.status(400).json({
            success: false,
            message: "Unsuccessful login attempt.",
            err,
          });
    });
  }
};

export const forgotPassword = async (req, res) =>
  await res.status(200).json({ success: true, message: "To be implemented" });

export const resetPassword = async (req, res) =>
  await res.status(200).json({ success: true, message: "To be implemented" });
