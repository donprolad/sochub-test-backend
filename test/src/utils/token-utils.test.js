import * as dotenv from "dotenv";
dotenv.config("../../../.env");

import {
  checkTokenExpiry,
  checkValidAuthDomain,
  checkTokenAudience,
  tokenPipe,
} from "../../../src/utils/token-utils";

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
    const validToken = checkTokenExpiry(payload);
    expect(validToken).toBe(false);
  });

  test("check expiry time on token is greater than current time", () => {
    const notExpiredEpochTime =
      Math.floor(new Date().getTime() / 1000.0) + 3600;
    const payloadCopy = { ...payload, exp: notExpiredEpochTime };

    const expired = checkTokenExpiry(payloadCopy);

    expect(expired).toBe(true);
  });

  test("check valid auth domain", () => {
    const validauthDomain = checkValidAuthDomain(process.env.TEST_AUTH_DOMAIN);
    expect(validauthDomain(payload)).toBe(true);
  });

  test("check token audience", () => {
    const audience = checkTokenAudience(process.env.HOST, process.env.PORT);

    expect(audience(payload)).toBe(true);
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
      checkTokenExpiry,
      checkTokenAudience(process.env.HOST, process.env.PORT),
      checkValidAuthDomain(process.env.TEST_AUTH_DOMAIN)
    );

    const result = validToken(payload);

    expect(result).toBe(false);
  });
});
