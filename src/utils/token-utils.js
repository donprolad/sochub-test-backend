import * as dotenv from 'dotenv'
dotenv.config("../../.env")

export const checkValidAuthdomain = (domain) => (payload) =>
  domain === payload?.iss ? true : false;

export const checkTokenExpiry = (payload) => {
  const currentEpochDate = Math.floor(new Date().getTime()/1000.0)

  return payload?.exp > currentEpochDate ? true : false
}

export const tokenPipe = (...fns) => payload => 
  [...fns].map(f => f(payload))
    .reduce((acc,v) => acc = acc && v , true)


export default tokenPipe(
  checkValidAuthdomain(process.env.AUTH_DOMAIN),
  checkTokenExpiry
)