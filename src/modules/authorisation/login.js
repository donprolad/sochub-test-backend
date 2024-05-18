import bcrypt from "bcrypt";

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

export const checkifAccountIsLocked = (user) =>
  user?.success && user?.data?.account_locked !== true
    ? user
    : {
        success: false,
        message: "Account is locked, please reset your password.",
        data: {
          account_locked: user?.data?.account_locked,
          failed_logins: user?.data?.failed_logins,
        },
      };

