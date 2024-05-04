import * as dotenv from "dotenv";
dotenv.config("../../.env");
import * as jose from "jose";
import axios from "axios";

import tokenIsValid from "../utils/token-utils.js";
import options from "../api/tokens.js";

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

export const getToken = async (req, res) => {
  const { client_id, grant_type, client_secret, audience } = req.headers;

  /**
   * TODO
   * 1. build token credential validation pipeline
   */
  const validCredentials = [
    client_id === process.env.CLIENT_ID,
    client_secret === process.env.CLIENT_SECRET,
    grant_type === process.env.GRANT_TYPE,
    audience === process.env.AUDIENCE,
  ];

  const valid = validCredentials.reduce((acc, v) => (acc = acc && v), true);

  valid
    ? await axios
        .request(options)
        .then((token) =>
          res.status(200)
            .json({
              success: true,
              message: "Token allocation, successful",
              data: token,
            })
        )
        .catch((error) =>
          res.status(400).json({
            success: false,
            message: "Token allocation, unsuccessful",
            error,
          })
        )
    : res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
};
