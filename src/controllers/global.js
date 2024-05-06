import { registerHandler } from "../db/global.js";

export const register = async (req, res) =>
  await registerHandler(req?.body)
    .then((registered) =>
      registered?.success
        ? res.status(201).json(registered)
        : res.status(400).json(registered)
    )
    .catch((err) => res.status(400).json(err));

export const login = async (req, res) =>
  await res.status(200).json({ success: true, message: "To be implemented" });

export const forgotPassword = async (req, res) =>
  await res.status(200).json({ success: true, message: "To be implemented" });

export const resetPassword = async (req, res) =>
  await res.status(200).json({ success: true, message: "To be implemented" });
