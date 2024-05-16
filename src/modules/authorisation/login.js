import bcrypt from "bcrypt"

export const comparePasswordAgainstHash = async (password, hash) =>
  (await bcrypt.compare(password, hash))
    ? {
        success: true,
        message: "Authentication successful",
      }
    : {
        success: false,
        message: "Authentication failed",
      };
