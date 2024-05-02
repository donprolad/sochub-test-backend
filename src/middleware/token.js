import * as dotenv from "dotenv";
dotenv.config("../../.env");
import * as jose from "jose";

import tokenIsValid from "../utils/token-utils.js";

export const authorizeToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    const accessToken = authorization.split(" ")[1];

    const alg = "RS256";
    const jwk = {
      e: "AQAB",
      kty: "RSA",
      n: process.env.CLIENT_PUBLIC_KEY,
    };

    const publicKey = await jose.importJWK(jwk, alg);

    const { payload } = await jose.jwtVerify(accessToken, publicKey);

    tokenIsValid(payload)
      ? next()
      : res.status(400).json({
          success: false,
          message: "Invalid token",
        });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid token",
      error,
    });
  }
};
