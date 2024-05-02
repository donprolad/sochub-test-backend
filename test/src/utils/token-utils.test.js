import * as dotenv from 'dotenv'
dotenv.config('../../../.env')

import { checkTokenExpiry, checkValidAuthdomain, tokenPipe} from "../../../src/utils/token-utils";

describe("token utility module", () => {
  const payload = {
    iss: 'https://app-domain.org.company.com/',
    sub: '3ca1d8ea8354649ab80afe65269f2102@clients',
    aud: 'http://localhost:3000',
    iat: 1714569287,
    exp: 1714655687,
    gty: 'client-credentials',
    azp: '3ca1d8ea8354649ab80afe65269f2102'
  }

  test("check expiry time on token", () => {
   
        //{ alg: 'RS256', typ: 'JWT', kid: 'svPzgAJl9RqidfrC6qcwV' } 
    const expired = checkTokenExpiry(payload)
    expect(expired).toBe(false)
  });

  test("check valid auth domain", () => {
    const validauthDomain = checkValidAuthdomain(process.env.TEST_AUTH_DOMAIN)
    expect(validauthDomain(payload)).toBe(true)
  })

  test("run through token validation pipeline", () => {
    const validToken = tokenPipe(
      checkTokenExpiry, 
      checkValidAuthdomain(process.env.TEST_AUTH_DOMAIN)
    )

    const result = validToken(payload)

    expect(result).toBe(false)
  })
});
