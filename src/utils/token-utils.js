import * as dotenv from "dotenv";
dotenv.config("../../.env");

/**
 * @function checkValidAuthdomain
 * @param {string} domain
 * @param {object} payload
 * @description partially applied function that checks the token auth domain
 */
export const checkValidAuthDomain = (domain) => (payload) =>
  domain === payload?.iss ? true : false;

/**
 * @function checkTokenExpiry
 * @param {Date} currentEpochDate
 * @param {object} payload
 * @description partially applied function that checks if token epoch time is expired.
 */
export const checkTokenExpiry = currentEpochDate => (payload) =>
  payload?.exp > currentEpochDate ? true : false;

/**
 * @function checkTokenAudience
 * @param  {...string} searchParams
 * @param {object} payload
 * @description partially applied function that checks if the token audience is correct.
 */
export const checkTokenAudience = (...searchParams) => (payload) =>
  searchParams
    .map((searchItem) =>
      payload?.aud.search(searchItem) !== -1 ? true : false
    )
    .reduce((acc, v) => (acc = acc && v), true);

/**
 * @function tokenPipe
 * @param  {...function} fns
 * @param  {payload} payload
 * @description validation pipeline of functions for the properties of a decoded token payload.
 */
export const tokenPipe = (...fns) => (payload) =>
  fns.map((f) => f(payload)).reduce((acc, v) => (acc = acc && v), true);

export default tokenPipe(
  checkValidAuthDomain(process.env.AUTH_DOMAIN),
  checkTokenAudience(process.env.HOST, process.env.PORT),
  checkTokenExpiry(Math.floor(new Date().getTime() / 1000.0))
);
