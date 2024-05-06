import * as dotenv from "dotenv";
dotenv.config("../../../.env");

import {
  checkTokenExpiry,
  checkValidAuthDomain,
  checkTokenAudience,
  tokenPipe,
} from "../../../src/utils/token-utils";

import { getCurrentEpochDate } from "../../../src/utils/date-utils.js"

describe("token utility module", () => {
  const payload = {
    iss: "https://app-domain.org.company.com/",
    sub: "3ca1d8ea8354649ab80afe65269f2102@clients",
    aud: "http://localhost:3000",
    iat: 1714569287,
    exp: 1714655687,
    gty: "client-credentials",
    azp: "3ca1d8ea8354649ab80afe65269f2102",
  };

  test("check expiry time on token has lapsed", () => {
    const validToken = checkTokenExpiry(getCurrentEpochDate());
    expect(validToken(payload)).toBe(false);
  });

  test("check expiry time on token is greater than current time", () => {
    const notExpiredEpochTime =
      Math.floor(new Date().getTime() / 1000.0) + 3600;
    const payloadCopy = { ...payload, exp: notExpiredEpochTime };

    const validToken = checkTokenExpiry(getCurrentEpochDate());
    expect(validToken(payloadCopy)).toBe(true);
  });

  test("check with null epoch date in event of system failure", () => {
    const notExpiredEpochTime =
      Math.floor(new Date().getTime() / 1000.0) + 3600;
    const payloadCopy = { ...payload, exp: notExpiredEpochTime };

    const validToken = checkTokenExpiry(null);
    expect(validToken(payloadCopy)).toBe(false);
  });

  test("check with null payload date in event of receiving a malformed expiration date", () => {
    const notExpiredEpochTime = null
    const payloadCopy = { ...payload, exp: notExpiredEpochTime };

    const validToken = checkTokenExpiry(getCurrentEpochDate());
    expect(validToken(payloadCopy)).toBe(false);
  });

  test("check valid auth domain", () => {
    const validauthDomain = checkValidAuthDomain(process.env.TEST_AUTH_DOMAIN);
    expect(validauthDomain(payload)).toBe(true);
  });

  test("check invalid auth domain", () => {
    const validauthDomain = checkValidAuthDomain("http://injectedwiththepoison.com")
    expect(validauthDomain(payload)).toBe(false)
  })

  test("check token audience with correct host", () => {
    const audience = checkTokenAudience(process.env.HOST, process.env.PORT);
    expect(audience(payload)).toBe(true);
  });

  test("check token audience with invalid host", () => {
    const audience = checkTokenAudience(null, 1234);
    expect(audience(payload)).toBe(false);
  });
});

describe("token pipeline module", () => {
  const payload = {
    iss: "https://app-domain.org.company.com/",
    sub: "3ca1d8ea8354649ab80afe65269f2102@clients",
    aud: "http://localhost:3000",
    iat: 1714569287,
    exp: 1714655687,
    gty: "client-credentials",
    azp: "3ca1d8ea8354649ab80afe65269f2102",
  };

  test("run through token validation pipeline", () => {
    const validToken = tokenPipe(
      checkTokenExpiry(getCurrentEpochDate()),
      checkTokenAudience(process.env.HOST, process.env.PORT),
      checkValidAuthDomain(process.env.TEST_AUTH_DOMAIN)
    );

    const result = validToken(payload);

    expect(result).toBe(false);
  });
});
