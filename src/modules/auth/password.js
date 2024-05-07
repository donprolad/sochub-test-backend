import bcrypt from "bcrypt";

/**
 * @function authenticateWithPassword
 * @param {*} password
 * @param {*} hash
 * @description Authenticate a user with a password and bcrypt password hash
 */

export const authenticateWithPassword = async (password, hash) =>
  await bcrypt.compare(password, hash, (err, found) => found ? found : found)
  //   found
  //     ? {
  //         success: true,
  //         message: "Authentication Successful",
  //         data: found,
  //       }
  //     : {
  //         success: false,
  //         message: "Authentication Unsuccessful",
  //         err,
  //       }
  // );
